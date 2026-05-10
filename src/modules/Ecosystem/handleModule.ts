import path from 'node:path';
import { intro } from 'proprompt';
import { line } from 'proprompt';
import { message } from 'proprompt';
import { select } from 'proprompt';
import { TerminatedByCtrlC } from 'proprompt';
import type { EcosystemContext } from '../../@types/EcosystemContext.ts';
import { pm2Client } from '../../tools/pm2/pm2Client.ts';
import { printEcosystemStatusTable } from '../../tools/printEcosystemStatusTable.ts';
import { EEcosystemMenuKey } from './menu.ts';
import { ECOSYSTEM_MENU_OPTIONS } from './menu.ts';

export async function handleEcosystemModule(context: EcosystemContext): Promise<void> {
  let initial = true;
  let resetInitial = false;
  let notice: null | (() => Promise<void>) = null;

  const packageJson = await import(path.join(process.cwd(), `/package.json`));
  await printIntro(context, packageJson);

  await pm2Client.connect();
  await printEcosystemStatusTable(context);
  await line(``);

  let actualContext = context;

  while (true) {
    if (resetInitial) {
      initial = false;
    }
    resetInitial = true;

    if (notice) {
      await notice();
      notice = null;
    }

    if ( ! initial) {
      await printIntro(actualContext, packageJson);
    }

    const { canceled, value: menuItem } = await select({
      message: `Select an option`,
      options: ECOSYSTEM_MENU_OPTIONS
        .filter((option) => {
          return ! option.value.disabled;
        })
        .filter((option) => {
          return actualContext.maintenanceMode
            ? true
            : ! option.value.maintenanceMode;
        })
        .filter((option) => {
          return actualContext.environment == null
            ? ! option.value.envRequired
            : true;
        })
        .filter((option) => {
          return actualContext.dbConfig == null
            ? option.value.key !== EEcosystemMenuKey.DB_ADMIN
            : true;
        }),
      throwOnCtrlC: false,
    });

    if (canceled || menuItem.key === EEcosystemMenuKey.EXIT) {
      return;
    }

    if (menuItem.key === EEcosystemMenuKey.SET_ENVIRONMENT) {
      try {
        const result = await menuItem.module!(actualContext);

        if (result) {
          if (result.maintenanceMode) {
            notice = actualContext.maintenanceMode
              ? () => message(`Maintenance Mode is already activated`, { as: `info` })
              : () => message(`Maintenance Mode has been activated`, { as: `success` });
          }
          else {
            const noticeText = `Current environment: ${result.environment}`;
            notice = actualContext.environment !== result.environment
              ? () => message(noticeText, { as: `success` })
              : () => message(noticeText, { as: `info` });
          }
          actualContext = result;
        }
      }
      catch (error) {
        if ( ! (error instanceof TerminatedByCtrlC)) {
          throw error;
        }
      }
    }
    else if (typeof menuItem.module === `function`) {
      try {
        await menuItem.module(actualContext);
      }
      catch (error) {
        if ( ! (error instanceof TerminatedByCtrlC)) {
          throw error;
        }
      }
    }
    else {
      await message(`Unsupported option`, { as: `danger` });
    }
  }
}

async function printIntro(context: EcosystemContext, packageJson: any) {
  const namespaceText = context.maintenanceMode
    ? `Maintenance Mode, namespace: ${context.namespace}`
    : context.environment
      ? `${context.environment}, namespace: ${context.namespace}`
      : `namespace: ${context.namespace}`;
  const text = `${context.ecosystemName} (${namespaceText}, version: ${packageJson.version})`;
  await intro(text);

  if (context.maintenanceMode) {
    await message([
      `Proceed with caution. In Maintenance Mode, you can (among other features):`,
      `1. Stop and delete processes for any application (across all namespaces and environments).`,
      `2. Delete log files for any application.`,
    ].join(`\n`), { as: `warning` });
  }
}
