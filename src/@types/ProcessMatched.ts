import type { AppConfig } from '../config/@types/AppConfig.ts';
import type { EProcessStatus } from './EProcessStatus.ts';
import type { Pm2NormalizedProcess } from './Pm2NormalizedProcess.ts';

export type ProcessMatched = {
  appConfig: AppConfig;
  environment: string;
  moduleErrorLogPath: string;
  moduleLogsDir: string;
  moduleOutLogPath: string;
  namespace: string;
  pm2NormalizedProcess: Pm2NormalizedProcess;
  proposedProcessName: string;

  /**
   * Special case here. When an application exits with code `0`, PM2 can be configured not to
   * restart the process. However, PM2 leaves the application in the waiting_restart status, which
   * is not acceptable for us. We check for this condition in this property and assign such a
   * process a different status.
   */
  status: Exclude<EProcessStatus, EProcessStatus.NEW>;
};
