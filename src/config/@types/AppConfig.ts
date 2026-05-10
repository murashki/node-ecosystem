/**
 * This is the format in which applications are described in the configuration file.
 *
 * An object of this type is encountered in the program mostly within objects of type `Process`. For
 * each `Process` object, an attempt is made to find a matching `AppConfig` object to determine
 * which application the process belongs to.
 */
export type AppConfig = {
  /**
   * Delay before retrying an application restart. Will increase exponentially: 100, 150, 225, etc.
   * `restartDelay` and `maxRestarts` are ignored in this case (`PM2` limitation). Default is
   * 100 ms.
   */
  expRestartDelay?: number;

  /**
   * The time `PM2` waits after sending a `SIGINT` signal before killing the process via a `SIGKILL`
   * signal.
   */
  killTimeout?: number;

  logsDatePrefix?: boolean;

  /**
   * Maximum number of restarts after which `PM2` will stop trying to restart the application.
   * Default is 30.
   */
  maxRestarts?: number;

  /**
   * For some reason, `PM2` determines whether a process completed successfully not by the exit
   * codes returned from `process.exit()`, but by the script's runtime. Yes, that's bullshit. So
   * this property might be useful for you. It specifies how long the application must run to be
   * considered successfully completed. Default is 100 ms.
   */
  minUptime?: number;

  moduleName: string;
  npmScript: string;

  /**
   * Delay before retrying an application restart. Default is 3000 ms.
   */
  restartDelay?: number;
};
