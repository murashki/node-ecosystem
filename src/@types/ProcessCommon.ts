import type { AppConfig } from '../config/@types/AppConfig.ts';
import type { EProcessStatus } from './EProcessStatus.ts';
import type { Pm2NormalizedProcess } from './Pm2NormalizedProcess.ts';

export type ProcessCommon = {
  appConfig: null | AppConfig;
  environment: null | string;
  moduleErrorLogPath: null | string;
  moduleLogsDir: null | string;
  moduleOutLogPath: null | string;
  namespace: null | string;
  pm2NormalizedProcess: null | Pm2NormalizedProcess;
  proposedProcessName: null | string;

  /**
   * In practice, `ProcessUnmatched` cannot have a status of `EProcessStatus.NEW`
   */
  status: EProcessStatus;
};
