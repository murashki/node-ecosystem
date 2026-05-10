import { dbCommando } from 'db-commando';
import { DbCommandoBootstrapConfig } from 'db-commando';
import type { EcosystemContext } from '../../../../@types/EcosystemContext.ts';
import { assertEnvironment } from '../../../../tools/assertEnvironment.ts';

export async function handleDbAdminModule(context: EcosystemContext): Promise<void> {
  assertEnvironment(context.environment);

  const dbCommandoContext: DbCommandoBootstrapConfig = {
    dbConfig: context.dbConfig!,
    environment: context.environment,
    systemDir: context.ecosystemConfig.systemDir,
  };

  await dbCommando(dbCommandoContext);
}
