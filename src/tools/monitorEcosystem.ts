import c from 'chalk';
import { cancel } from 'proprompt';
import { createWriter } from 'proprompt';
import { delay } from 'proprompt';
import { line } from 'proprompt';
import { lineSplit } from 'proprompt';
import { stdin } from 'proprompt';
import { tableSplit } from 'proprompt';
import { terminate } from 'proprompt';
import { TerminatedByCtrlC } from 'proprompt';
import { waitForKey } from 'proprompt';
import type { EcosystemContext } from '../@types/EcosystemContext.ts';
import { ECOSYSTEM_MONITOR_REFRESH_INTERVAL } from '../constants.ts';
import type { MonitorEcosystemOpts } from './@types/MonitorEcosystemOpts.ts';
import { fabricateProcesses } from './pm2/fabricateProcesses.ts';
import { ecosystemStatusColumns } from './processColumns.ts';

export async function monitorEcosystem(context: EcosystemContext, opts?: MonitorEcosystemOpts): Promise<void> {
  const writer = createWriter();

  const key = await waitForKey([stdin.key.ctrlC, stdin.key.esc], async (keyListenerHandler) => {
    while (true) {
      const lines: string[] = [];

      const procs = await fabricateProcesses(context, { unstarted: opts?.unstarted ?? true });

      if (procs.length) {
        lines.push(...tableSplit({ columns: ecosystemStatusColumns, data: procs }));
      }
      else {
        lines.push(...lineSplit(`No process found...`, { as: `warning` }));
      }

      lines.push(...lineSplit(c.dim.gray(`Press "Esc" to exit monitor`)));

      await writer.write({ lines, animateInitial: true });

      if (keyListenerHandler.resolved) {
        break;
      }
      else {
        await delay(ECOSYSTEM_MONITOR_REFRESH_INTERVAL, (delayHandler) => {
          keyListenerHandler.onResolve = delayHandler.resolve;
        });

        if (keyListenerHandler.resolved) {
          break;
        }
      }
    }
  });

  writer.end();

  await line(``);

  if (key === stdin.key.ctrlC) {
    await terminate();
    throw new TerminatedByCtrlC(`Ecosystem Monitor`);
  }
  else {
    await cancel();
  }
}
