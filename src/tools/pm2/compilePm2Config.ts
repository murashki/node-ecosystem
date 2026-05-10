import type { EcosystemContext } from '../../@types/EcosystemContext.ts';

export function compilePm2Config(environment: string, execCommand: string, context: EcosystemContext) {
  if ( ! environment) {
    throw new Error(`Environment should be defined`);
  }

  const apps = context.ecosystemConfig.apps.map((app) => {
    // base
    const append_env_to_name = false;
    const cwd = process.cwd();
    const name = `${app.moduleName}-${context.namespace}-${environment}`;
    const namespace = context.namespace;

    // script
    const args = app.npmScript.replace(/^npm /, ``);
    const script = `npm`;

    // restarts
    const exp_backoff_restart_delay = app.expRestartDelay || (app.restartDelay ? undefined : 100);
    const kill_timeout = app.killTimeout;
    const max_restarts = app.maxRestarts ?? 30;
    const min_uptime = app.minUptime ?? 100;
    const restart_delay = exp_backoff_restart_delay ? undefined : app.restartDelay ?? 3000;
    const stop_exit_codes = [0];

    // logs
    const time = app.logsDatePrefix ?? true;

    return {
      // base
      append_env_to_name,
      cwd,
      name,
      namespace,

      // script
      args,
      script,

      // env
      env: {
        /**
         * Keep in mind that these variables should be seen as variables specific to a particular
         * application. These are not general-purpose variables, but variables specific to the
         * currently running application. Do not try to put variables here that would be responsible
         * for something ecosystem-wide, without being bound to a specific application. This is an
         * anti-pattern and will ultimately confuse you. Find another place for these purposes.
         */

        LAUNCHED_FROM_ECOSYSTEM_MANAGEMENT_PANEL: `true`,
        NODE_ENV: environment,
        NODE_ECOSYSTEM_NAMESPACE: context.namespace,
        NODE_ECOSYSTEM_MODULE_NAME: app.moduleName,
        NODE_ECOSYSTEM_APP_NAME: name,

        /**
         * We need to record the process startup parameters, since the management panel can be
         * accessed with different parameters later. For example, `context.logsDir` may have
         * changed. Node.js modules may also read these variables to determine where to write logs.
         */
        NODE_ECOSYSTEM_MODULE_LOGS_DIR: context.ecosystemConfig.moduleLogsDir,
        NODE_ECOSYSTEM_MODULE_ERROR_LOG_PATH: `${context.ecosystemConfig.moduleLogsDir}/${app.moduleName}-error.log`,
        NODE_ECOSYSTEM_MODULE_OUT_LOG_PATH: `${context.ecosystemConfig.moduleLogsDir}/${app.moduleName}-out.log`,
      },

      // restarts
      exp_backoff_restart_delay,
      kill_timeout,
      max_restarts,
      min_uptime,
      restart_delay,
      stop_exit_codes,

      // logs
      time,
    };
  });

  return { __EXECUTED_COMMAND__: execCommand, apps };
}
