import fs from 'node:fs';
import { enterDirectTerminalManipulation } from 'proprompt';
import { exitDirectTerminalManipulation } from 'proprompt';
import type { EcosystemContext } from './@types/EcosystemContext.ts';
import type { EcosystemBootstrapConfig } from './config/@types/EcosystemBootstrapConfig.ts';
import { defaultEnvironments } from './config/defaultEnvironments.ts';
import { handleEcosystemModule } from './modules/Ecosystem/handleModule.ts';
import { testEcosystemConfig } from './tools/pm2/testEcosystemConfig.ts';

export async function ecosystem(config: EcosystemBootstrapConfig) {
  testEcosystemConfig(config);

  const systemDir = config.systemDir || `./.node-ecosystem`;
  if ( ! fs.existsSync(systemDir)) {
    fs.mkdirSync(systemDir, { recursive: true });
  }

  const context: EcosystemContext = {
    dbConfig: null,
    ecosystemConfig: {
      __ecosystemBootstrapConfig: config,
      apps: config.apps,
      environments: config.environments ?? defaultEnvironments,
      moduleLogsDir: config.moduleLogsDir || `${systemDir}/logs`,
      systemDir,
    },
    ecosystemName: config.ecosystemName,
    environment: null,
    maintenanceMode: false,
    namespace: config.namespace,
  };

  enterDirectTerminalManipulation();

  try {
    await handleEcosystemModule(context);
  }
  catch (error) {
    exitDirectTerminalManipulation();
    throw error;
  }

  exitDirectTerminalManipulation();
}
