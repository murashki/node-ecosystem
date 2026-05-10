import { dump } from 'proprompt';
import { line } from 'proprompt';
import type { EcosystemContext } from '../../../../../../@types/EcosystemContext.ts';
import { pm2Client } from '../../../../../../tools/pm2/pm2Client.ts';

export async function handleDumpPm2ProcessesModule(context: EcosystemContext): Promise<void> {
  const procs = await pm2Client.list();
  for (const proc of procs) {
    await dump(proc.pm2Process, { depth: 3 });
    await line(``);
  }
}
