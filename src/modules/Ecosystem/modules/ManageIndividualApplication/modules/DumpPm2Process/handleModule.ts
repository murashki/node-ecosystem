import { dump } from 'proprompt';
import { line } from 'proprompt';
import type { ProcessCommon } from '../../../../../../@types/ProcessCommon.ts';
import type { EcosystemContext } from '../../../../../../@types/EcosystemContext.ts';

export async function handleDumpPm2ProcessModule(context: EcosystemContext, proc: ProcessCommon): Promise<void> {
  await dump(proc.pm2NormalizedProcess?.pm2Process, { depth: 3 });
  await line(``);
}
