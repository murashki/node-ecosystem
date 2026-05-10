import type { AppConfig } from '../config/@types/AppConfig.ts';
import type { DbConfig } from '../config/@types/DbConfig.ts';
import type { EcosystemBootstrapConfig } from '../config/@types/EcosystemBootstrapConfig.ts';
import type { EnvironmentConfig } from '../config/@types/EnvironmentConfig.ts';

export type EcosystemContext = {
  dbConfig: null | DbConfig;
  ecosystemConfig: {
    __ecosystemBootstrapConfig: EcosystemBootstrapConfig;
    apps: AppConfig[];
    environments: Record<string, EnvironmentConfig>;

    /**
     * Directory where modules should store their logs.
     */
    moduleLogsDir: string;

    systemDir: string;
  };
  ecosystemName: string;
  environment: null | string;
  maintenanceMode: boolean;
  namespace: string;
};
