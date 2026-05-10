import { message } from 'proprompt';
import { select } from 'proprompt';
import type { EcosystemContext } from '../../../../@types/EcosystemContext.ts';
import { EPm2MenuKey } from './menu.ts';
import { PM2_MENU_OPTIONS } from './menu.ts';

export async function handlePm2Module(context: EcosystemContext): Promise<void | 0 | symbol> {
  while (true) {
    const { canceled, value: menuItem } = await select({
      message: `Select an option`,
      options: PM2_MENU_OPTIONS,
    });

    if (canceled || menuItem.key === EPm2MenuKey.BACK) {
      return;
    }

    if (typeof menuItem.module === `function`) {
      await menuItem.module(context);
    }
    else {
      await message(`Unsupported option`, { as: `danger` });
    }
  }
}
