import { checkEnvironmentContext } from '../../tools/checkEnvironmentContext.ts';
import { checkMaintenanceModeContext } from '../../tools/checkMaintenanceModeContext.ts';
import { getCommonMenuOptions } from '../../tools/getCommonMenuOptions.ts';
import { handleConfigModule } from './modules/Config/handleModule.ts';
import { handleDbAdminModule } from './modules/DbAdmin/handleModule.ts';
import { handleDeleteIndividualApplicationModule } from './modules/DeleteIndividualApplication/handleModule.ts';
import { handleEcosystemMonitorModule } from './modules/EcosystemMonitor/handleModule.ts';
import { handleEcosystemStatusModule } from './modules/EcosystemStatus/handleModule.ts';
import { handleLogsModule } from './modules/Logs/handleModule.ts';
import { handleManageIndividualApplicationModule } from './modules/ManageIndividualApplication/handleModule.ts';
import { handlePlaygroundModule } from './modules/Playground/handleModule.ts';
import { handlePm2Module } from './modules/Pm2/handleModule.ts';
import { handleRestartIndividualApplicationModule } from './modules/RestartIndividualApplication/handleModule.ts';
import { handleSetEnvironmentModule } from './modules/SetEnvironment/handleModule.ts';
import { handleStartIndividualApplicationModule } from './modules/StartIndividualApplication/handleModule.ts';
import { handleStopIndividualApplicationModule } from './modules/StopIndividualApplication/handleModule.ts';

export enum EEcosystemMenuKey {
  CONFIG = `CONFIG`,
  DB_ADMIN = `DB_ADMIN`,
  DELETE_INDIVIDUAL_APPLICATION = `DELETE_INDIVIDUAL_APPLICATION`,
  ECOSYSTEM_MONITOR = `ECOSYSTEM_MONITOR`,
  ECOSYSTEM_STATUS = `ECOSYSTEM_STATUS`,
  EXIT = `EXIT`,
  LOGS = `LOGS`,
  MANAGE_INDIVIDUAL_APPLICATION = `MANAGE_INDIVIDUAL_APPLICATION`,
  PLAYGROUND = `PLAYGROUND`,
  RESTART_INDIVIDUAL_APPLICATION = `RESTART_INDIVIDUAL_APPLICATION`,
  SET_ENVIRONMENT = `SET_ENVIRONMENT`,
  START_INDIVIDUAL_APPLICATION = `START_INDIVIDUAL_APPLICATION`,
  STOP_INDIVIDUAL_APPLICATION = `STOP_INDIVIDUAL_APPLICATION`,
  PM2 = `PM2`,
}

type EcosystemMenuItemCustomProps = {
  envRequired?: boolean;
  maintenanceMode?: boolean;
};

export const ECOSYSTEM_MENU_OPTIONS = getCommonMenuOptions<EcosystemMenuItemCustomProps>([
  {
    key: EEcosystemMenuKey.ECOSYSTEM_STATUS,
    label: `Ecosystem status`,
    module: handleEcosystemStatusModule,
  },
  {
    key: EEcosystemMenuKey.ECOSYSTEM_MONITOR,
    label: `Ecosystem monitor`,
    module: handleEcosystemMonitorModule,
  },
  {
    key: EEcosystemMenuKey.SET_ENVIRONMENT,
    label: `Set environment...`,
    module: handleSetEnvironmentModule,
  },
  {
    key: EEcosystemMenuKey.MANAGE_INDIVIDUAL_APPLICATION,
    label: `Manage individual application...`,
    module: checkEnvironmentContext(handleManageIndividualApplicationModule),
    envRequired: true,
  },
  {
    key: EEcosystemMenuKey.START_INDIVIDUAL_APPLICATION,
    label: `Start individual application...`,
    module: checkEnvironmentContext(handleStartIndividualApplicationModule),
    envRequired: true,
    disabled: true,
  },
  {
    key: EEcosystemMenuKey.RESTART_INDIVIDUAL_APPLICATION,
    label: `Restart individual application...`,
    module: checkEnvironmentContext(handleRestartIndividualApplicationModule),
    envRequired: true,
    disabled: true,
  },
  {
    key: EEcosystemMenuKey.STOP_INDIVIDUAL_APPLICATION,
    label: `Stop individual application...`,
    maintenanceMode: true,
    module: checkMaintenanceModeContext(handleStopIndividualApplicationModule),
  },
  {
    key: EEcosystemMenuKey.DELETE_INDIVIDUAL_APPLICATION,
    label: `Delete individual application...`,
    maintenanceMode: true,
    module: checkMaintenanceModeContext(handleDeleteIndividualApplicationModule),
  },
  {
    key: EEcosystemMenuKey.CONFIG,
    label: `Config...`,
    module: handleConfigModule,
  },
  {
    key: EEcosystemMenuKey.DB_ADMIN,
    label: `DB admin...`,
    module: handleDbAdminModule,
  },
  {
    key: EEcosystemMenuKey.LOGS,
    label: `Logs...`,
    module: handleLogsModule,
  },
  {
    key: EEcosystemMenuKey.PM2,
    label: `PM2...`,
    module: handlePm2Module,
  },
  {
    disabled: true,
    key: EEcosystemMenuKey.PLAYGROUND,
    label: `Playground...`,
    module: handlePlaygroundModule,
  },
  {
    key: EEcosystemMenuKey.EXIT,
    label: `Exit`,
  },
]);
