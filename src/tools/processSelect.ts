import { compileMultipleColumnMatrix } from 'proprompt';
import { message } from 'proprompt';
import { select } from 'proprompt';
import type { EcosystemContext } from '../@types/EcosystemContext.ts';
import type { ProcessCommon } from '../@types/ProcessCommon.ts';
import type { ProcessSelectOpts } from './@types/ProcessSelectOpts.ts';
import { fabricateProcesses } from './pm2/fabricateProcesses.ts';
import { environmentColumn } from './processColumns.ts';
import { nameColumn } from './processColumns.ts';
import { namespaceColumn } from './processColumns.ts';
import { statusColumn } from './processColumns.ts';

/**
 * Returns:
 *   null - if the user chose to exit or no processes were found
 *   Process - if the user selected a process
 */
export async function processSelect(context: EcosystemContext, opts?: ProcessSelectOpts): Promise<null | ProcessCommon> {
  while (true) {
    const procs = await fabricateProcesses(context, { unstarted: opts?.unstarted ?? true });

    if ( ! procs.length) {
      await message(`No processes found`, { as: `warning` });
      return null;
    }

    const matrix = compileMultipleColumnMatrix({
      columns,
      data: procs,
      gap: ` `,
    });

    const procOptions = procs.map((proc, index) => {
      return {
        value: proc,
        label: matrix.rows[index].join(` `),
      };
    });

    const procSelectResult = await select({
      message: `Select an app`,
      options: procOptions,
    });

    if (procSelectResult.canceled) {
      return null;
    }

    const proc = procSelectResult.value;

    if (opts?.acceptedEnvironment && ! opts.acceptedEnvironment.includes(proc.environment)) {
      await message(`Incompatible environment. Please select another app.`, { as: `warning` });
      continue;
    }
    else if (opts?.acceptedStatuses && ! opts.acceptedStatuses.includes(proc.status)) {
      await message(`Incompatible process status. Please select another app.`, { as: `warning` });
      continue;
    }

    const nextProcs = await fabricateProcesses(context, { unstarted: true });

    return nextProcs.find((nextProc) => nextProc.proposedProcessName === proc.proposedProcessName)!;
  }
}

const columns = [
  nameColumn,
  namespaceColumn,
  environmentColumn,
  statusColumn,
];
