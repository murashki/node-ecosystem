export enum EProcessStatus {
  ERRORED = `errored`,

  /**
   * Our own status, does not exist in PM2
   */
  FINISHED = `finished`,

  LAUNCHING = `launching`,

  /**
   * Our own status, does not exist in PM2
   */
  NEW = `new`,

  /**
   * No one knows what it means
   */
  ONE_LAUNCH_STATUS = `one-launch-status`,

  ONLINE = `online`,
  STOPPED = `stopped`,
  STOPPING = `stopping`,

  /**
   * Our own status, does not exist in PM2
   */
  UNKNOWN = `unknown`,

  WAITING_RESTART = `waiting restart`,
}
