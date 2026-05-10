import type { EProcessStatus } from './EProcessStatus.ts';
import type { Pm2NormalizedProcess } from './Pm2NormalizedProcess.ts';

export type ProcessUnmatched = {
  appConfig: null;
  environment: null | string;
  moduleErrorLogPath: null | string;
  moduleLogsDir: null | string;
  moduleOutLogPath: null | string;
  namespace: null | string;
  pm2NormalizedProcess: Pm2NormalizedProcess;
  proposedProcessName: null;
  status: Exclude<EProcessStatus, EProcessStatus.NEW>;
};
