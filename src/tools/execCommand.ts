import fs from 'node:fs';
import { format } from 'date-fns/format';
import { confirmAction } from 'proprompt';
import { exception } from 'proprompt';
import { exec } from 'proprompt';
import { line } from 'proprompt';
import { message } from 'proprompt';
import { monitorFile } from 'proprompt';
import { select } from 'proprompt';
import type { EcosystemContext } from '../@types/EcosystemContext.ts';
import type { ProcessCommon } from '../@types/ProcessCommon.ts';
import { EProcessStatus } from '../@types/EProcessStatus.ts';
import type { ExecCommandAction } from './@types/ExecCommandAction.ts';
import type { ExecCommandOpts } from './@types/ExecCommandOpts.ts';
import { compileDeleteAppCommand } from './pm2/commands.ts';
import { compileRestartAppCommand } from './pm2/commands.ts';
import { compileStartAppCommand } from './pm2/commands.ts';
import { compileStopAppCommand } from './pm2/commands.ts';
import { compilePm2Config } from './pm2/compilePm2Config.ts';
import { fabricateProcesses } from './pm2/fabricateProcesses.ts';
import { clearLogFiles } from './clearLogFiles.ts';
import { printEcosystemStatusTable } from './printEcosystemStatusTable.ts';
import { printPm2LogFilePath } from './printPm2LogFilePath.ts';
import { printProcessLogsInfo } from './printProcessLogsInfo.ts';

type ActionConfig = {
  acceptedStatuses: EProcessStatus[];
  confirm: boolean;
  generateCommand: (proc: ProcessCommon, configFilePath: string) => string;
};

const actionsConfig: Record<ExecCommandAction, ActionConfig> = {
  start: {
    acceptedStatuses: [
      EProcessStatus.NEW,
    ],
    confirm: false,
    generateCommand: (proc: ProcessCommon, configFilePath: string) => compileStartAppCommand(proc, configFilePath),
  },
  restart: {
    acceptedStatuses: [
      EProcessStatus.ERRORED,
      EProcessStatus.FINISHED,
      EProcessStatus.STOPPED,
    ],
    confirm: false,
    generateCommand: (proc: ProcessCommon, configFilePath: string) => compileRestartAppCommand(proc, configFilePath),
  },
  stop: {
    acceptedStatuses: [
      EProcessStatus.ERRORED,
      EProcessStatus.LAUNCHING,
      EProcessStatus.ONLINE,
      EProcessStatus.STOPPING,
      EProcessStatus.WAITING_RESTART,
    ],
    confirm: true,
    generateCommand: (proc: ProcessCommon) => compileStopAppCommand(proc),
  },
  delete: {
    acceptedStatuses: [
      EProcessStatus.FINISHED,
      EProcessStatus.ERRORED,
      EProcessStatus.STOPPED,
    ],
    confirm: true,
    generateCommand: (proc: ProcessCommon) => compileDeleteAppCommand(proc),
  },
};

/**
 * Returns:
 *   true  - if the command was executed successfully
 *   false - if the command was not executed
 */
export async function execCommand(context: EcosystemContext, proc: ProcessCommon, opts: ExecCommandOpts): Promise<boolean> {
  async function checkNamespace(proc: ProcessCommon) {
    switch (opts.action) {
      case `stop`:
      case `delete`: {
        if (context.maintenanceMode) {
          return true;
        }
        else if (proc.namespace !== context.namespace) {
          await message(`Incompatible process namespace. The command cannot be executed.`, { as: `danger` });
          return false;
        }
        else {
          return true;
        }
      }
      default: {
        if (context.maintenanceMode) {
          await message(`The command cannot be executed in Maintenance Mode`, { as: `danger` });
          return false;
        }
        else if (proc.namespace !== context.namespace) {
          await message(`Incompatible process namespace. The command cannot be executed.`, { as: `danger` });
          return false;
        }
        else {
          return true;
        }
      }
    }
  }

  async function checkEnvironment(proc: ProcessCommon) {
    switch (opts.action) {
      case `stop`:
      case `delete`: {
        if (context.maintenanceMode) {
          return true;
        }
        else if ( ! context.environment || proc.environment !== context.environment) {
          await message(`Incompatible environment. The command cannot be executed.`, { as: `danger` });
          return false;
        }
        else {
          return true;
        }
      }
      default: {
        if (context.maintenanceMode) {
          await message(`The command cannot be executed in Maintenance Mode`, { as: `danger` });
          return false;
        }
        else if ( ! context.environment || proc.environment !== context.environment) {
          await message(`Incompatible environment. The command cannot be executed.`, { as: `danger` });
          return false;
        }
        else {
          return true;
        }
      }
    }
  }

  async function checkStatus(proc: ProcessCommon) {
    if ( ! actionsConfig[opts.action].acceptedStatuses.includes(proc.status)) {
      await message(`Incompatible process status. The command cannot be executed.`, { as: `danger` });
      return false;
    }
    else {
      return true;
    }
  }

  if ( ! await checkNamespace(proc)) {
    return false;
  }

  if ( ! await checkEnvironment(proc)) {
    return false;
  }

  if ( ! await checkStatus(proc)) {
    return false;
  }

  let confirmed = true;

  if (actionsConfig[opts.action].confirm && proc.environment !== `development`) {
    const validateString = proc.proposedProcessName ?? proc.pm2NormalizedProcess?.name ?? `unknown app`;
    if (validateString) {
      const actionName = `${opts.action} the application`;
      confirmed = await confirmAction(actionName, validateString);
    }
    else {
      confirmed = true;
    }
  }

  if ( ! confirmed) {
    return false;
  }

  let shouldClearLogFiles = false;
  let shouldDeleteLogFiles = false;
  // let shouldResetRestartCounters = false;

  if (opts.action === `restart`) {
    const { canceled, value } = await select({
      message: `Clear log files?`,
      options: [
        { label: `Yes, clear log files`, value: true },
        { label: `No`, value: false },
      ],
    });

    if (canceled) {
      return false;
    }

    shouldClearLogFiles = value;
  }
  else if (opts.action === `delete`) {
    const { canceled, value } = await select({
      message: `Delete log files?`,
      options: [
        { label: `Yes, delete log files`, value: true },
        { label: `No`, value: false },
      ],
    });

    if (canceled) {
      return false;
    }

    shouldDeleteLogFiles = value;
  }

  // if (opts.action === `restart`) {
  //   const { canceled, value } = await select({
  //     message: `Reset restart counters?`,
  //     options: [
  //       { label: `Yes, reset restart counters`, value: true },
  //       { label: `No`, value: false },
  //     ],
  //   });
  //
  //   if (canceled) {
  //     return false;
  //   }
  //
  //   shouldResetRestartCounters = value;
  // }

  const preExecProcs = await fabricateProcesses(context, { unstarted: true });

  const preExecProc = preExecProcs.find((preExecProc) => preExecProc.proposedProcessName === proc.proposedProcessName)!;

  const statusCorrect = await checkStatus(preExecProc);

  if ( ! statusCorrect) {
    return false;
  }

  if (shouldClearLogFiles) {
    await clearLogFiles(proc);
  }

  if (shouldDeleteLogFiles) {
    await clearLogFiles(proc, { delete: true });
  }

  const configDir = `${context.ecosystemConfig.systemDir}/pm2-launched-configs`;
  const configFilePath = `${configDir}/${preExecProc.namespace}.${preExecProc.environment}.${getIsoFormattedDate()}.config.json`;
  const command = actionsConfig[opts.action].generateCommand(preExecProc, configFilePath);

  if ([`start`, `restart`].includes(opts.action)) {
    if ( ! fs.existsSync(configDir)) {
      fs.mkdirSync(configDir, { recursive: true });
    }
    const pm2Config = compilePm2Config(preExecProc.environment!, command, context);
    fs.writeFileSync(configFilePath, JSON.stringify(pm2Config, null, 2), { encoding: `utf8` });
  }


  try {
    await exec(command);
  } catch (error) {
    await exception(error);
    await printPm2LogFilePath();
    await line(``);
    return false;
  }

  await message(`Successfully`, { as: `success` });

  if (opts.action == `delete`) {
    await printEcosystemStatusTable(context);
    await line(``);
  }
  else {
    const postExecProcs = await fabricateProcesses(context, { unstarted: true });

    const postExecProc = postExecProcs.find((postExecProc) => postExecProc.proposedProcessName === preExecProc.proposedProcessName)!;

    await printProcessLogsInfo(postExecProc);

    if (opts.action === `stop`) {
      await printEcosystemStatusTable(context);
      await line(``);
    }
    else {
      await monitorFile(postExecProc.pm2NormalizedProcess!.pm2OutLogPath!, { lineCount: 20 });
    }
  }

  return true;
}

function getIsoFormattedDate() {
  return format(new Date(), `yyyy-MM-dd'T'HH:mm:ss:SSSXXX`);
}
