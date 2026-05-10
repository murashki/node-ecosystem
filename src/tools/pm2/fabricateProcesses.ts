import type { EcosystemContext } from '../../@types/EcosystemContext.ts';
import type { ProcessCommon } from '../../@types/ProcessCommon.ts';
import type { ProcessMatched } from '../../@types/ProcessMatched.ts';
import type { ProcessUnmatched } from '../../@types/ProcessUnmatched.ts';
import type { ProcessVirtual } from '../../@types/ProcessVirtual.ts';
import { EProcessStatus } from '../../@types/EProcessStatus.ts';
import type { FabricateProcessesOpts } from './@types/FabricateProcessesOpts.ts';
import { pm2Client } from './pm2Client.ts';

export async function fabricateProcesses(context: EcosystemContext, opts?: FabricateProcessesOpts): Promise<ProcessCommon[]> {
  const pm2Procs = await pm2Client.list();
  const proc: ProcessCommon[] = pm2Procs
    .map((pm2NormalizedProcess): ProcessMatched | ProcessUnmatched => {
      const pm2Env: Record<string, any> = (pm2NormalizedProcess.pm2Process.pm2_env as any).env;
      const launchedFromEcosystemManagementPanel = pm2Env.LAUNCHED_FROM_ECOSYSTEM_MANAGEMENT_PANEL === `true`;

      const status = pm2NormalizedProcess.status === EProcessStatus.WAITING_RESTART && pm2NormalizedProcess.exitCode === 0
        ? EProcessStatus.FINISHED
        : (pm2NormalizedProcess.status as EProcessStatus ?? EProcessStatus.UNKNOWN);

      if (launchedFromEcosystemManagementPanel) {
        const environment = pm2Env.NODE_ENV as string;
        const namespace = pm2Env.NODE_ECOSYSTEM_NAMESPACE as string;
        const moduleName = pm2Env.NODE_ECOSYSTEM_MODULE_NAME as string;
        const proposedProcessName = pm2Env.NODE_ECOSYSTEM_APP_NAME as string;
        const appConfig = context.ecosystemConfig.apps.find((app) => (app.moduleName === moduleName))!;
        const moduleLogsDir = pm2Env.NODE_ECOSYSTEM_MODULE_LOGS_DIR as string;
        const moduleErrorLogPath = pm2Env.NODE_ECOSYSTEM_MODULE_ERROR_LOG_PATH as string;
        const moduleOutLogPath = pm2Env.NODE_ECOSYSTEM_MODULE_OUT_LOG_PATH as string;

        return {
          appConfig,
          environment,
          moduleErrorLogPath,
          moduleLogsDir,
          moduleOutLogPath,
          namespace,
          pm2NormalizedProcess,
          proposedProcessName,
          status: status as ProcessMatched[`status`],
        } satisfies ProcessMatched;
      }
      else {
        return {
          appConfig: null,
          environment: (pm2Env.NODE_ENV as undefined | string) ?? null,
          moduleErrorLogPath: null,
          moduleLogsDir: null,
          moduleOutLogPath: null,
          namespace: null,
          pm2NormalizedProcess,
          proposedProcessName: null,
          status: status as ProcessUnmatched[`status`],
        } satisfies ProcessUnmatched;
      }
    });

  if (opts?.unstarted) {
    Object.keys(context.ecosystemConfig.environments).forEach((environment) => {
      const namespace = context.namespace;
      if (namespace) {
        context.ecosystemConfig.apps.forEach((appConfig) => {
          const proposedProcessName = `${appConfig.moduleName}-${namespace}-${environment}`;
          if ( ! proc.some((process) => process.proposedProcessName === proposedProcessName)) {
            const virtualProc: ProcessVirtual = {
              appConfig,
              environment,
              moduleErrorLogPath: `${context.ecosystemConfig.moduleLogsDir}/${proposedProcessName}-errror.log`,
              moduleLogsDir: context.ecosystemConfig.moduleLogsDir,
              moduleOutLogPath: `${context.ecosystemConfig.moduleLogsDir}/${proposedProcessName}-out.log`,
              namespace,
              pm2NormalizedProcess: null,
              proposedProcessName,
              status: EProcessStatus.NEW,
            };
            proc.push(virtualProc);
          }
        });
      }
    });
  }

  return [...proc]
    .sort((a, b) => {
      return (a.proposedProcessName ?? a.pm2NormalizedProcess?.name) === (b.proposedProcessName ?? b.pm2NormalizedProcess?.name)
        ? a.namespace === b.namespace
          ? a.environment === b.environment
            ? a.pm2NormalizedProcess?.id === b.pm2NormalizedProcess?.id
              ? (a.pm2NormalizedProcess?.pid ?? 0) > (b.pm2NormalizedProcess?.pid ?? 0) ? 1 : -1
              : (a.pm2NormalizedProcess?.id ?? 0) > (b.pm2NormalizedProcess?.id ?? 0) ? 1 : -1
            : (a.environment ?? ``) > (b.environment ?? ``) ? 1 : -1
          : (a.namespace ?? ``) > (b.namespace ?? ``) ? 1 : -1
        : (a.proposedProcessName ?? a.pm2NormalizedProcess?.name ?? ``) > (b.proposedProcessName ?? b.pm2NormalizedProcess?.name ?? ``) ? 1 : -1;
    });
}
