import pm2 from 'pm2';

/**
 * Objects of this type are created from `pm2` processes and describe the process as `pm2` sees it,
 * but in a format convenient for the application. All properties may be null because `pm2` does not
 * guarantee their presence, at least judging by the type definitions. Such properties are
 * encountered mostly in processes started independently of the ecosystem. For applications
 * started within the ecosystem these properties always have values.
 *
 *
 * TODO There is currently some inconsistency with `restartTime` and `unstableRestarts`. The first
 *   reports how many times the process was restarted. The second reports how many times it was
 *   restarted due to unstable operation. However, `min_uptime` complicates things. In theory it is
 *   the minimum time a process must run without failures. In practice, however, it appears to be
 *   the minimum time between two starts, after which a restart is considered an `unstableRestart`.
 *   Consequently, if your application crashes immediately after restarting, there is no guarantee
 *   that `restartTime` and `unstableRestarts` will increase at the same rate, especially when
 *   `expRestartDelay` is enabled. The number 30 also comes into play here somehow. For example, if
 *   `restartDelay` is set to 2, the two counters will start diverging from each other after the
 *   15th restart.
 */
export type Pm2NormalizedProcess = {
  autoRestart: null | boolean;
  autoStart: null | boolean;
  cpu: null | number;
  cwd: null | string;

  /**
   * Always null because a `pm2` process has no explicit reference to an environment.
   */
  environment: null;

  exitCode: null | number;
  expRestartDelay: null | number;
  id: null | number;
  killTimeout: null | number;
  memory: null | number;
  name: null | string;
  namespace: null | string;
  minUptime: null | number;

  pid: null | number;

  /**
   * This is where `pm2` writes its own logs.
   */
  pm2ErrorLogPath: null | string;
  pm2OutLogPath: null | string;

  pm2Process: pm2.ProcessDescription;

  /**
   * Present when `expRestartDelay` is set.
   */
  prevRestartDelay: null | number | undefined;
  restartDelay: null | number;
  restartTime: null | number;
  status: null | string;
  unstableRestarts: null | number;
  uptime: null | number;
};
