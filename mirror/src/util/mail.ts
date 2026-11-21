/*
 * server component for the TimeLimit App
 * Copyright (C) 2019 - 2026 Jonas Lochmann
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, version 3 of the License.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

import { compile } from 'ejs'
import Mail from 'email-addresses'
import { readFileSync } from 'fs'
import { Mail as NMail, SentMessageInfo, createTransport } from 'nodemailer'
import { resolve } from 'path'
import { MailTransportConfig, MailWhitelistConfig } from '../config.js'
import { IllegalStateException } from '../exception/index.js'

const mailimprint = process.env.MAIL_IMPRINT || 'not defined'
const mailServerBlacklist = (process.env.MAIL_SERVER_BLACKLIST || '').split(',').filter((item) => !!item)

const mailSender = process.env.MAIL_SENDER || ''

export interface MailTransport {
  actual: NMail<SentMessageInfo> | null
  log: boolean
}

export function createMailTransport(config: MailTransportConfig): MailTransport {
  if (config.mailTransport === null) return { actual: null, log: false }
  else if (config.mailTransport.type === 'prod') return { actual: createTransport(config.mailTransport.value), log: false }
  else if (config.mailTransport.type === 'dev') return { actual: createTransport({ jsonTransport: true }), log: true }
  else if (config.mailTransport.type === 'test') return { actual: createTransport({ jsonTransport: true }), log: false }
  else throw new Error()
}

function createMailTemplateSender (templateName: string) {
  const compileTemplate = (filename: string) => compile(
    readFileSync(resolve(import.meta.dirname, '../../../other/mail', templateName, filename)).toString('utf8')
  )

  const subjectTemplate = compileTemplate('subject.ejs')
  const textTemplate = compileTemplate('text.ejs')
  const htmlTemplate = compileTemplate('html.ejs')

  const sendMail = async ({ mailTransport, receiver, params }: {
    receiver: string
    params: object
    mailTransport: MailTransport
  }) => {
    const actual = mailTransport.actual

    if (!actual) {
      throw new Error('can not send mails without mail config and without NODE_ENV=development')
    }

    const subject = subjectTemplate(params).replace(/\n/g, ' ')
    const text = textTemplate(params)
    const html = htmlTemplate(params)

    await new Promise<void>((resolve, reject) => {
      actual.sendMail({
        from: mailSender,
        to: receiver,
        subject,
        text,
        html
      }, (err, info) => {
        if (err) {
          reject(err)
        } else {
          if (mailTransport.log) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const data = (info as any).message

            console.log(JSON.stringify({
              ...JSON.parse(data),
              params
            }, null, 2))
          }

          resolve()
        }
      })
    })
  }

  return { sendMail }
}

const loginMailSender = createMailTemplateSender('login')

export const sendAuthenticationMail = async ({
  receiver, code, locale, deviceName, mailTransport
}: {
  receiver: string, code: string, locale: string, deviceName: string | null
  mailTransport: MailTransport
}) => {
  await loginMailSender.sendMail({
    receiver,
    params: {
      subject: locale === 'de' ? 'Anmeldung bei TimeLimit' : 'Sign in at TimeLimit',
      introtext: locale === 'de' ? 'Geben Sie zum Authentifizieren folgenden Code in TimeLimit ein' : 'To authenticate, enter the following code in TimeLimit',
      code,
      outrotext: locale === 'de' ? 'Geben Sie diesen Code nicht an Dritte weiter.' : 'Do not share this code with third parties.',
      mailimprint,
      deviceName,
      deviceNameIntro: locale === 'de' ? 'Die Anmeldung wurde am Gerät' : 'The login was attempted at the device',
      deviceNameOutro: locale === 'de' ? 'versucht.' : '.'
    },
    mailTransport
  })
}

const manipulationMailSender = createMailTemplateSender('manipulation')

export const sendManipulationWarningMail = async ({ receiver, deviceName, mailTransport }: {
  receiver: string
  deviceName: string
  mailTransport: MailTransport
}) => {
  await manipulationMailSender.sendMail({
    receiver,
    params: {
      subject: 'TimeLimit@' + deviceName + ' - Manipulation',
      deviceName,
      mailimprint
    },
    mailTransport
  })
}

const uninstallMailSender = createMailTemplateSender('uninstall')

export const sendUninstallWarningMail = async ({ receiver, deviceName, mailTransport }: {
  receiver: string
  deviceName: string
  mailTransport: MailTransport
}) => {
  await uninstallMailSender.sendMail({
    receiver,
    params: {
      subject: 'TimeLimit removed from ' + deviceName,
      deviceName,
      mailimprint
    },
    mailTransport
  })
}

const taskDoneSender = createMailTemplateSender('taskdone')

export const sendTaskDoneMail = async ({ receiver, child, task, mailTransport }: {
  receiver: string
  child: string
  task: string
  mailTransport: MailTransport
}) => {
  await taskDoneSender.sendMail({
    receiver,
    params: { child, task, mailimprint },
    mailTransport
  })
}

const deviceLinkedSender = createMailTemplateSender('device-linked-by-mail')

export const sendDeviceLinkedMail = async ({ receiver, deviceName, locale, mailTransport }: {
  receiver: string
  deviceName: string
  locale: string
  mailTransport: MailTransport
}) => {
  await deviceLinkedSender.sendMail({
    receiver,
    params: {
      subject: locale === 'de' ? 'Gerät hinzugefügt' : 'Device added',
      preText: locale === 'de' ? 'Soeben wurde das Gerät' : 'The device',
      deviceName,
      postText: locale === 'de' ? 'über Ihre E-Mail-Adresse hinzugefügt.' : 'was added using your mail address.',
      securityText: getMailSecurityText(locale),
      mailimprint
    },
    mailTransport
  })
}

const passwordRecoveryUsedMailSender = createMailTemplateSender('password-recovery-used')

export const sendPasswordRecoveryUsedMail = async ({ receiver, locale, mailTransport }: {
  receiver: string
  locale: string
  mailTransport: MailTransport
}) => {
  await passwordRecoveryUsedMailSender.sendMail({
    receiver,
    params: {
      subject: locale === 'de' ? 'Passwort-Vergessen-Funktion verwendet' : 'Password reset',
      text: locale === 'de' ?
        'Soeben wurde Ihr TimeLimit-Passwort mit der Passwort-Vergessen-Funktion geändert.' :
        'Your password was changed using the password reset feature.',
      securityText: getMailSecurityText(locale),
      mailimprint
    },
    mailTransport
  })
}

const accountDeletedMailSender = createMailTemplateSender('account-deleted')

export const sendAccountDeletedMail = async ({ receiver, mailTransport }: {
  receiver: string
  mailTransport: MailTransport
}) => {
  await accountDeletedMailSender.sendMail({
    receiver,
    params: {
      mailimprint
    },
    mailTransport
  })
}

function getMailSecurityText (locale: string) {
  if (locale === 'de') {
    return 'Achten Sie darauf, dass Ihr Kind/Ihre Kinder keinen Zugang zu der E-Mail-Adresse hat/haben, die Sie bei TimeLimit angegeben haben.'
  } else {
    return 'Make sure that your child/children can not access the mail addresss that you use for TimeLimit.'
  }
}

export function isMailServerBlacklisted (mail: string): boolean {
  const parts = mail.split('@')
  const domain = parts[parts.length - 1]

  return mailServerBlacklist.indexOf(domain.toLowerCase()) !== -1
}

export function isMailAddressCoveredByWhitelist (config: MailWhitelistConfig, mail: string): boolean {
  if (config.mailWhitelist.length === 0) {
    return true
  }

  const mailParts = mail.split('@')
  const mailDomain = mailParts[mailParts.length - 1]

  for (let i = 0; i < config.mailWhitelist.length; i++) {
    const whtielistItem = config.mailWhitelist[i]

    const isDomain = whtielistItem.indexOf('@') === -1

    if (isDomain) {
      if (mailDomain === whtielistItem) {
        return true
      }
    } else {
      if (mail === whtielistItem) {
        return true
      }
    }
  }

  return false
}

export function sanitizeMailAddress (input: string): string | null {
  const parsed = Mail.parseOneAddress(input)

  if ((!parsed) || (parsed.type !== 'mailbox')) {
    return null
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const address = (parsed as any).address

  if (typeof address !== 'string') {
    throw new IllegalStateException({ staticMessage: 'mail address is not a string' })
  }

  return address
}
