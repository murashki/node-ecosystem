import path from 'node:path';
import { dump } from 'proprompt';
import type { CatFileOpts } from 'proprompt';
import { catFile } from 'proprompt';
import { editFile } from 'proprompt';
import { message } from 'proprompt';
import { select } from 'proprompt';
import type { EcosystemContext } from '../../../../@types/EcosystemContext.ts';
import { EConfigMenuKey } from './menu.ts';
import { createConfigMenuOptions } from './menu.ts';

export async function handleConfigModule(context: EcosystemContext): Promise<void | symbol> {
  const catFileOpts: CatFileOpts = {
    fileFormatter: `env`,
  };

  const configMenuOptions = createConfigMenuOptions(Object.keys(context.ecosystemConfig.environments));

  while (true) {
    const { canceled, value: menuItem } = await select({
      message: `Select an option`,
      options: configMenuOptions,
    });

    if (canceled || menuItem.key === EConfigMenuKey.BACK) {
      return;
    }

    if (menuItem.key === EConfigMenuKey.VIEW_ECOSYSTEM_BOOTSTRAP_CONFIG) {
      await dump(context.ecosystemConfig.__ecosystemBootstrapConfig, { depth: 10 });
      continue;
    }

    if (menuItem.key === EConfigMenuKey.VIEW_BASE_ENVS) {
      await catFile(path.join(process.cwd(), `.env.base`), catFileOpts);
      continue;
    }

    if (menuItem.key === EConfigMenuKey.VIEW_BASE_LOCAL_ENVS) {
      await catFile(path.join(process.cwd(), `.env.base.local`), catFileOpts);
      continue;
    }

    if (menuItem.key === EConfigMenuKey.VIEW_ENVIRONMENT_ENVS) {
      await catFile(path.join(process.cwd(), `.env.${menuItem.environment}`), catFileOpts);
      continue;
    }

    if (menuItem.key === EConfigMenuKey.VIEW_ENVIRONMENT_LOCAL_ENVS) {
      await catFile(path.join(process.cwd(), `.env.${menuItem.environment}.local`), catFileOpts);
      continue;
    }

    if (menuItem.key === EConfigMenuKey.EDIT_BASE_LOCAL_ENVS) {
      await editFile(path.join(process.cwd(), `.env.base.local`));
      continue;
    }

    if (menuItem.key === EConfigMenuKey.EDIT_ENVIRONMENT_LOCAL_ENVS) {
      await editFile(path.join(process.cwd(), `.env.${menuItem.environment}.local`));
      continue;
    }

    // if (menuItem.key === EConfigMenuKey.DUMP_CURRENT_ENVS) {
    //   if (context.maintenanceMode) {
    //     await message(`Feature is not supported in Maintenance Mode`, { as: `danger` });
    //   }
    //   else {
    //     assertEnvironment(context.environment);
    //     await dump(getEnvs(context.environment));
    //     await line(``);
    //   }
    //   continue;
    // }

    // if (menuItem.key === EConfigMenuKey.DUMP_ENVIRONMENT_ENVS) {
    //   assertEnvironment(menuItem.environment);
    //   await dump(getEnvs(menuItem.environment));
    //   await line(``);
    //   continue;
    // }

    await message(`Unsupported option`, { as: `danger` });
  }
}
