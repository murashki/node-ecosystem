import { getCommonMenuOptions } from '../../../../tools/getCommonMenuOptions.ts';
import { handleDumpPm2NormalizedProcessesModule } from './modules/DumpPm2NormalizedProcesses/handleModule.ts';
import { handleDumpPm2ProcessesModule } from './modules/DumpPm2Processes/handleModule.ts';
import { handleDumpProcessesModule } from './modules/DumpProcesses/handleModule.ts';

export enum EPm2MenuKey {
  BACK = `BACK`,
  DUMP_PM2_NORMALIZED_PROCESSES = `DUMP_PM2_NORMALIZED_PROCESSES`,
  DUMP_PM2_PROCESSES = `DUMP_PM2_PROCESSES`,
  DUMP_PROCESSES = `DUMP_PROCESSES`,
}

export const PM2_MENU_OPTIONS = getCommonMenuOptions([
  {
    key: EPm2MenuKey.DUMP_PM2_PROCESSES,
    label: `Dump PM2 processes`,
    module: handleDumpPm2ProcessesModule,
  },
  {
    key: EPm2MenuKey.DUMP_PM2_NORMALIZED_PROCESSES,
    label: `Dump PM2 normalized processes`,
    module: handleDumpPm2NormalizedProcessesModule,
  },
  {
    key: EPm2MenuKey.DUMP_PROCESSES,
    label: `Dump processes`,
    module: handleDumpProcessesModule,
  },
  {
    key: EPm2MenuKey.BACK,
    label: `Go back`,
  },
]);
