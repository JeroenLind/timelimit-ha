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

import { EventEmitter } from 'events'
import { SimpleDatabase } from '../database/simple/index.js'

export class ConnectedDevicesManager {
  private deviceConnectionCounters = new Map<string, number>()
  // event name = key, value = boolean/ isConnected
  deviceConnectionChangeEmitter = new EventEmitter()

  static buildKey = ({ familyId, deviceId }: {familyId: string, deviceId: string}) => `${familyId}_${deviceId}`

  reportDeviceConnected = ({ key }: {key: string}) => {
    const oldValue = this.deviceConnectionCounters.get(key) || 0
    const newValue = oldValue + 1

    this.deviceConnectionCounters.set(key, newValue)

    if (oldValue === 0) {
      this.deviceConnectionChangeEmitter.emit(key, true)
    }
  }

  reportDeviceDisconnected = ({ key }: {key: string}) => {
    const oldValue = this.deviceConnectionCounters.get(key) || 0
    const newValue = Math.max(0, oldValue - 1)

    if (newValue === 0) {
      this.deviceConnectionCounters.delete(key)
    } else {
      this.deviceConnectionCounters.set(key, newValue)
    }

    if (oldValue !== 0 && newValue === 0) {
      this.deviceConnectionChangeEmitter.emit(key, false)
    }
  }

  isDeviceConnected = ({ key }: {key: string}) => (
    this.deviceConnectionCounters.has(key) &&
    (this.deviceConnectionCounters.get(key) !== 0)
  )
}

export class VisibleConnectedDevicesManager {
  connectedDevicesManager = new ConnectedDevicesManager()
  private database: SimpleDatabase

  constructor ({ database }: {
    database: SimpleDatabase
  }) {
    this.database = database
  }

  private familyDeviceShareConnectedChangeEmitter = new EventEmitter()

  notifyShareConnectedChanged = ({ familyId, deviceId, showDeviceConnected }: { familyId: string, deviceId: string, showDeviceConnected: boolean }) => {
    this.familyDeviceShareConnectedChangeEmitter.emit(familyId, { deviceId, showDeviceConnected })
  }

  observeConnectedDevicesOfFamily = ({ familyId, listener }: {
    familyId: string
    listener: (deviceIds: Array<string>) => void
  }): {
    shutdown: () => void
  } => {
    const observesDevices = new Set<string>()
    const devicesWithSharingEnabled = new Set<string>()
    const connectedDevices = new Set<string>()
    const sentConnectedDevices = new Set<string>()
    let hasShutDown = false
    const shutdownHooks: Array<() => void> = []

    const shutdown = () => {
      hasShutDown = true

      shutdownHooks.forEach((hook) => hook())
    }

    const sendStatus = () => {
      if (hasShutDown) {
        return
      }

      const result: Array<string> = []

      sentConnectedDevices.forEach((deviceId) => result.push(deviceId))

      listener(result)
    }

    const addDevice = ({ deviceId, showDeviceConnected }: {
      deviceId: string
      showDeviceConnected: boolean
    }) => {
      const key = ConnectedDevicesManager.buildKey({ familyId, deviceId })
      const isConnected = this.connectedDevicesManager.isDeviceConnected({ key })

      if (!observesDevices.has(deviceId)) {
        observesDevices.add(deviceId)

        if (isConnected) {
          connectedDevices.add(deviceId)
        }

        if (!hasShutDown) {
          const listener = (nowConnected: boolean) => {
            const oldConnected = connectedDevices.has(deviceId)

            if (oldConnected !== nowConnected) {
              if (nowConnected) {
                connectedDevices.add(deviceId)

                if (devicesWithSharingEnabled.has(deviceId)) {
                  sentConnectedDevices.add(deviceId)
                  sendStatus()
                }
              } else {
                connectedDevices.delete(deviceId)

                if (devicesWithSharingEnabled.has(deviceId)) {
                  sentConnectedDevices.delete(deviceId)
                  sendStatus()
                }
              }
            }
          }

          this.connectedDevicesManager.deviceConnectionChangeEmitter.addListener(key, listener)

          shutdownHooks.push(() => {
            this.connectedDevicesManager.deviceConnectionChangeEmitter.removeListener(key, listener)
          })
        }
      }

      if (showDeviceConnected) {
        if (!devicesWithSharingEnabled.has(deviceId)) {
          devicesWithSharingEnabled.add(deviceId)
        }

        if (isConnected) {
          if (!sentConnectedDevices.has(deviceId)) {
            sentConnectedDevices.add(deviceId)
            sendStatus()
          }
        }
      } else {
        if (devicesWithSharingEnabled.has(deviceId)) {
          devicesWithSharingEnabled.delete(deviceId)

          if (sentConnectedDevices.has(deviceId)) {
            sentConnectedDevices.delete(deviceId)
            sendStatus()
          }
        }
      }
    }

    // add all current devices
    ;(async () => {
      const devices = await this.database.transaction(async (transaction) => {
        return await transaction.device.getDeviceIdsAndShowDeviceConnectedByFamilyId(familyId);
      })

      devices.forEach(({ deviceId, showDeviceConnected }) => {
        addDevice({ deviceId, showDeviceConnected })
      })
    })().catch(() => { /* ignore */ })

    {
      // add all new devices + apply changes of sharing
      const listener = ({ deviceId, showDeviceConnected }: {
        deviceId: string
        showDeviceConnected: boolean
      }) => {
        addDevice({
          deviceId,
          showDeviceConnected
        })
      }

      this.familyDeviceShareConnectedChangeEmitter.addListener(familyId, listener)
      shutdownHooks.push(() => this.familyDeviceShareConnectedChangeEmitter.removeListener(familyId, listener))
    }

    return { shutdown }
  }
}
