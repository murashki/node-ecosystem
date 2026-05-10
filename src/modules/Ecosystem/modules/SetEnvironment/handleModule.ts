import { select } from 'proprompt';
import { type EcosystemContext } from '../../../../@types/EcosystemContext.ts';
import { ESetEnvironmentMenuKey } from './menu.ts';
import { createSetEnvironmentMenuOptions } from './menu.ts';

export async function handleSetEnvironmentModule(context: EcosystemContext): Promise<null | EcosystemContext> {
  const menuOptions = createSetEnvironmentMenuOptions(Object.keys(context.ecosystemConfig.environments));

  const { canceled, value: menuItem } = await select({
    message: `Select an option`,
    options: menuOptions,
  });

  if (canceled || menuItem.key === ESetEnvironmentMenuKey.BACK) {
    return null;
  }

  if (menuItem.key === ESetEnvironmentMenuKey.MAINTENANCE) {
    return {
      ...context,
      dbConfig: null,
      environment: null,
      maintenanceMode: true,
    };
  }
  else {
    return {
      ...context,
      dbConfig: context.ecosystemConfig.environments[menuItem.key].dbConfig ?? null,
      environment: menuItem.key,
      maintenanceMode: false,
    };
  }
}
