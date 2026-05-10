import { line } from 'proprompt';
import { table } from 'proprompt';
import type { EcosystemContext } from '../@types/EcosystemContext.ts';
import type { PrintEcosystemStatusTableOpts } from './@types/PrintEcosystemStatusTableOpts.ts';
import { fabricateProcesses } from './pm2/fabricateProcesses.ts';
import { ecosystemStatusColumns } from './processColumns.ts';

export async function printEcosystemStatusTable(context: EcosystemContext, opts?: PrintEcosystemStatusTableOpts): Promise<void> {
  const procs = await fabricateProcesses(context, { unstarted: opts?.unstarted ?? true });

  if (procs.length) {
    await table({ columns: ecosystemStatusColumns, data: procs });
  }
  else {
    await line(`No process found...`, { as: `warning` });
  }
}
