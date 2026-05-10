import type { EcosystemContext } from '../../../../@types/EcosystemContext.ts';
import type { ProcessCommon } from '../../../../@types/ProcessCommon.ts';
import { getCommonMenuOptions } from '../../../../tools/getCommonMenuOptions.ts';
import { handleDeleteApplicationModule } from './modules/DeleteApplication/handleModule.ts';
import { handleDumpPm2ProcessModule } from './modules/DumpPm2Process/handleModule.ts';
import { handleDumpProcessModule } from './modules/DumpProcess/handleModule.ts';
import { handleRestartApplicationModule } from './modules/RestartApplication/handleModule.ts';
import { handleStartApplicationModule } from './modules/StartApplication/handleModule.ts';
import { handleStopApplicationModule } from './modules/StopApplication/handleModule.ts';

export enum EManageIndividualApplicationMenuKey {
  BACK = `BACK`,
  DELETE_APPLICATION = `DELETE_APPLICATION`,
  DUMP_PROCESS = `DUMP_PROCESS`,
  DUMP_PM2_PROCESS = `DUMP_PM2_PROCESS`,
  MONITOR_MODULE_ERROR_LOG_FILE = `MONITOR_MODULE_ERROR_LOG_FILE`,
  MONITOR_MODULE_OUT_LOG_FILE = `MONITOR_MODULE_OUT_LOG_FILE`,
  MONITOR_PM2_ERROR_LOG_FILE = `MONITOR_PM2_ERROR_LOG_FILE`,
  MONITOR_PM2_OUT_LOG_FILE = `MONITOR_PM2_OUT_LOG_FILE`,
  PRINT_MODULE_ERROR_LOG_FILE = `PRINT_MODULE_ERROR_LOG_FILE`,
  PRINT_MODULE_OUT_LOG_FILE = `PRINT_MODULE_OUT_LOG_FILE`,
  PRINT_PM2_ERROR_LOG_FILE = `PRINT_PM2_ERROR_LOG_FILE`,
  PRINT_PM2_OUT_LOG_FILE = `PRINT_PM2_OUT_LOG_FILE`,
  RESTART_APPLICATION = `RESTART_APPLICATION`,
  START_APPLICATION = `START_APPLICATION`,
  STOP_APPLICATION = `STOP_APPLICATION`,
}

type ManageIndividualApplicationMenuItemCustomProps = {
  module?: (context: EcosystemContext, proc: ProcessCommon) => Promise<any>;
};

export const MANAGE_INDIVIDUAL_APPLICATION_MENU_OPTIONS = getCommonMenuOptions<ManageIndividualApplicationMenuItemCustomProps>([
  {
    key: EManageIndividualApplicationMenuKey.START_APPLICATION,
    label: `Start application`,
    module: handleStartApplicationModule,
  },
  {
    key: EManageIndividualApplicationMenuKey.RESTART_APPLICATION,
    label: `Restart application...`,
    module: handleRestartApplicationModule,
  },
  {
    key: EManageIndividualApplicationMenuKey.STOP_APPLICATION,
    label: `Stop application`,
    module: handleStopApplicationModule,
  },
  {
    key: EManageIndividualApplicationMenuKey.DELETE_APPLICATION,
    label: `Delete application`,
    module: handleDeleteApplicationModule,
  },
  {
    key: EManageIndividualApplicationMenuKey.MONITOR_PM2_OUT_LOG_FILE,
    label: `Monitor PM2 .out log file`,
  },
  {
    key: EManageIndividualApplicationMenuKey.MONITOR_PM2_ERROR_LOG_FILE,
    label: `Monitor PM2 .error log file`,
  },
  {
    key: EManageIndividualApplicationMenuKey.PRINT_PM2_OUT_LOG_FILE,
    label: `Print PM2 .out log file`,
  },
  {
    key: EManageIndividualApplicationMenuKey.PRINT_PM2_ERROR_LOG_FILE,
    label: `Print PM2 .error log file`,
  },
  {
    key: EManageIndividualApplicationMenuKey.MONITOR_MODULE_OUT_LOG_FILE,
    label: `Monitor module .out log file`,
  },
  {
    key: EManageIndividualApplicationMenuKey.MONITOR_MODULE_ERROR_LOG_FILE,
    label: `Monitor module .error log file`,
  },
  {
    key: EManageIndividualApplicationMenuKey.PRINT_MODULE_OUT_LOG_FILE,
    label: `Print module .out log file`,
  },
  {
    key: EManageIndividualApplicationMenuKey.PRINT_MODULE_ERROR_LOG_FILE,
    label: `Print module .error log file`,
  },
  {
    key: EManageIndividualApplicationMenuKey.DUMP_PROCESS,
    label: `Dump process`,
    module: handleDumpProcessModule,
  },
  {
    key: EManageIndividualApplicationMenuKey.DUMP_PM2_PROCESS,
    label: `Dump PM2 process`,
    module: handleDumpPm2ProcessModule,
  },
  {
    key: EManageIndividualApplicationMenuKey.BACK,
    label: `Go back`,
  },
]);
