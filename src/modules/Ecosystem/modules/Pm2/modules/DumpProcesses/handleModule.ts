import { dump } from 'proprompt';
import { line } from 'proprompt';
import type { EcosystemContext } from '../../../../../../@types/EcosystemContext.ts';
import { fabricateProcesses } from '../../../../../../tools/pm2/fabricateProcesses.ts';

export async function handleDumpProcessesModule(context: EcosystemContext): Promise<void> {
  const procs = await fabricateProcesses(context, { unstarted: true });
  for (const proc of procs) {
    await dump(proc, { depth: 3 });
    await line(``);
  }
}
