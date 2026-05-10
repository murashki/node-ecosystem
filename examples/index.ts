import type { EcosystemBootstrapConfig } from '../src/index.ts';
import { ecosystem } from '../src/index.ts';
import devConfig from '../dev-config.local.json';

const config: EcosystemBootstrapConfig = {
  apps: [
    {
      moduleName: 'vasya-module',
      npmScript: `npm run examples:vasya-module`,
      restartDelay: 3000,
    },
  ],
  ecosystemName: `Vasya Ecosystem`,
  environments: {
    development: {
      dbConfig: {
        host: devConfig.db.host,
        port: devConfig.db.port,
        user: devConfig.db.user,
        password: devConfig.db.password,
        database: devConfig.db.database,
      },
    },
    production: {
      dbConfig: {
        host: devConfig.db.host,
        port: devConfig.db.port,
        user: devConfig.db.user,
        password: devConfig.db.password,
        database: devConfig.db.database,
      },
    },
  },
  moduleLogsDir: `./logs`,
  namespace: `local`,
};

await ecosystem(config);
process.exit(0);
