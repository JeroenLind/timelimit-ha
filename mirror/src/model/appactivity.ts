export interface SerializedAppActivityItem {
  p: string
  c: string
  t: string
}

export class AppActivityItem {
  readonly packageName: string
  readonly activityName: string
  readonly title: string

  constructor ({ packageName, activityName, title }: {
    packageName: string
    activityName: string
    title: string
  }) {
    if ((!packageName) || (!activityName)) {
      throw new IncompleteAppActivityItemException('incomplete app activity')
    }

    this.packageName = packageName
    this.activityName = activityName
    this.title = title
  }

  static parse = ({ p, c, t }: SerializedAppActivityItem) => (
    new AppActivityItem({
      packageName: p,
      activityName: c,
      title: t
    })
  )

  serialize = (): SerializedAppActivityItem => ({
    p: this.packageName,
    c: this.activityName,
    t: this.title
  })
}

export type SerializedRemovedAppActivityItem = [string, string]

export class RemovedAppActivityItem {
  readonly packageName: string
  readonly activityName: string

  constructor ({ packageName, activityName }: {
    packageName: string
    activityName: string
  }) {
    if ((!packageName) || (!activityName)) {
      throw new IncompleteAppActivityItemException('incomplete app activity')
    }

    this.packageName = packageName
    this.activityName = activityName
  }

  static parse = (data: SerializedRemovedAppActivityItem) => (
    new RemovedAppActivityItem({
      packageName: data[0],
      activityName: data[1]
    })
  )

  serialize = (): SerializedRemovedAppActivityItem => ([
    this.packageName,
    this.activityName
  ])
}

export class IncompleteAppActivityItemException extends Error {}
