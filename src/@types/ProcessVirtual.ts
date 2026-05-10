import type { AppConfig } from '../config/@types/AppConfig.ts';
import type { EProcessStatus } from './EProcessStatus.ts';

export type ProcessVirtual = {
  appConfig: AppConfig;
  environment: string;
  moduleErrorLogPath: string;
  moduleLogsDir: string;
  moduleOutLogPath: string;
  namespace: string;
  pm2NormalizedProcess: null;
  proposedProcessName: string;
  status: EProcessStatus.NEW;
};
