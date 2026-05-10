import pm2 from 'pm2';
import type { Pm2NormalizedProcess } from '../../@types/Pm2NormalizedProcess.ts';

export function normalize(process: pm2.ProcessDescription): Pm2NormalizedProcess {
  // @ts-ignore
  const autoRestart = process.pm2_env?.autorestart ?? null;
  // @ts-ignore
  const autoStart = process.pm2_env?.autostart ?? null;
  const cpu = process.monit?.cpu ?? null;
  const cwd =  process.pm2_env?.pm_cwd ?? null;

  /**
   * Always null because a `pm2` process has no explicit reference to an environment.
   */
  const environment = null;

  // @ts-ignore
  const expRestartDelay = process.pm2_env?.exp_backoff_restart_delay ?? null;
  // @ts-ignore
  const exitCode = process.pm2_env?.exit_code ?? null;
  const id = process.pm_id ?? null;
  // @ts-ignore
  const killTimeout = process.pm2_env?.kill_timeout ?? null;

  /**
   * For processes started through the ecosystem, this will be a long name in the format
   * `${name}-${namespace}-${environment}`.
   */
  const name = process.name ?? null;

  // @ts-ignore
  const namespace = process.pm2_env?.namespace ?? null;
  const memory = process.monit?.memory ?? null;
  // @ts-ignore
  const minUptime = process.pm2_env?.min_uptime ?? null;
  const pid = process.pid ?? null;
  const pm2ErrorLogPath = process.pm2_env?.pm_err_log_path ?? null;
  const pm2OutLogPath = process.pm2_env?.pm_out_log_path ?? null;
  const pm2Process = process;
  // @ts-ignore
  const prevRestartDelay = process.pm2_env?.prev_restart_delay;
  // @ts-ignore
  const restartDelay = process.pm2_env?.restart_delay ?? null;
  const restartTime = process.pm2_env?.restart_time ?? null;
  const status = process.pm2_env?.status ?? null;
  const unstableRestarts = process.pm2_env?.unstable_restarts ?? null;
  const uptime = process.pm2_env?.pm_uptime ?? null;

  return {
    autoRestart,
    autoStart,
    cpu,
    cwd,
    environment,
    pm2ErrorLogPath,
    exitCode,
    expRestartDelay,
    id,
    killTimeout,
    memory,
    minUptime,
    name,
    namespace,
    pid,
    pm2Process,
    prevRestartDelay,
    pm2OutLogPath,
    restartDelay,
    restartTime,
    status,
    unstableRestarts,
    uptime,
  };
}
