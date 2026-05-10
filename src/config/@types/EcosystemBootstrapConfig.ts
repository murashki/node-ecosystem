import type { AppConfig } from './AppConfig.ts';
import type { EnvironmentConfig } from './EnvironmentConfig.ts';

export type EcosystemBootstrapConfig = {
  apps: AppConfig[];
  ecosystemName: string;
  environments?: Record<string, EnvironmentConfig>;
  namespace: string;

  /**
   * Directory where modules should store their logs.
   */
  moduleLogsDir?: string;

  systemDir?: string;
};
