import { catFile } from 'proprompt';
import { message } from 'proprompt';
import { monitorFile } from 'proprompt';
import { select } from 'proprompt';
import type { EcosystemContext } from '../../../../@types/EcosystemContext.ts';
import { fabricateProcesses } from '../../../../tools/pm2/fabricateProcesses.ts';
import { processSelect } from '../../../../tools/processSelect.ts';
import { required } from '../../../../tools/required.ts';
import { EManageIndividualApplicationMenuKey } from './menu.ts';
import { MANAGE_INDIVIDUAL_APPLICATION_MENU_OPTIONS } from './menu.ts';

export async function handleManageIndividualApplicationModule(context: EcosystemContext): Promise<void> {
  const acceptedEnvironment = context.environment ? [context.environment] : [];

  const proc = await processSelect(context, {
    acceptedEnvironment,
  });

  if ( ! proc) {
    return;
  }

  let currentProc;

  while (true) {
    const { canceled, value: menuItem } = await select({
      message: `Select an option`,
      options: MANAGE_INDIVIDUAL_APPLICATION_MENU_OPTIONS,
    });

    if (canceled || menuItem.key === EManageIndividualApplicationMenuKey.BACK) {
      return;
    }

    const nextProcs = await fabricateProcesses(context, { unstarted: true });
    currentProc = nextProcs.find((nextProc) => nextProc.proposedProcessName === proc.proposedProcessName)!;

    if (menuItem.key === EManageIndividualApplicationMenuKey.MONITOR_MODULE_OUT_LOG_FILE) {
      await monitorFile(required(currentProc.moduleOutLogPath));
      continue;
    }

    if (menuItem.key === EManageIndividualApplicationMenuKey.MONITOR_MODULE_ERROR_LOG_FILE) {
      await monitorFile(required(currentProc.moduleErrorLogPath));
      continue;
    }

    if (menuItem.key === EManageIndividualApplicationMenuKey.MONITOR_PM2_OUT_LOG_FILE) {
      await monitorFile(required(currentProc.pm2NormalizedProcess!.pm2OutLogPath));
      continue;
    }

    if (menuItem.key === EManageIndividualApplicationMenuKey.MONITOR_PM2_ERROR_LOG_FILE) {
      await monitorFile(required(currentProc.pm2NormalizedProcess!.pm2ErrorLogPath));
      continue;
    }

    if (menuItem.key === EManageIndividualApplicationMenuKey.PRINT_MODULE_OUT_LOG_FILE) {
      await catFile(required(currentProc.moduleOutLogPath));
      continue;
    }

    if (menuItem.key === EManageIndividualApplicationMenuKey.PRINT_MODULE_ERROR_LOG_FILE) {
      await catFile(required(currentProc.moduleErrorLogPath));
      continue;
    }

    if (menuItem.key === EManageIndividualApplicationMenuKey.PRINT_PM2_OUT_LOG_FILE) {
      await catFile(required(currentProc.pm2NormalizedProcess!.pm2OutLogPath));
      continue;
    }

    if (menuItem.key === EManageIndividualApplicationMenuKey.PRINT_PM2_ERROR_LOG_FILE) {
      await catFile(required(currentProc.pm2NormalizedProcess!.pm2ErrorLogPath));
      continue;
    }

    if ( ! menuItem.module || typeof menuItem.module !== `function`) {
      await message(`Unsupported option`, { as: `danger` });
      continue;
    }

    const result = await menuItem.module(context, currentProc);

    if (menuItem.key === EManageIndividualApplicationMenuKey.DELETE_APPLICATION && result) {
      return;
    }
  }
}
