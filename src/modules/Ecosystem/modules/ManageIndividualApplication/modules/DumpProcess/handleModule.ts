import { dump } from 'proprompt';
import { line } from 'proprompt';
import type { ProcessCommon } from '../../../../../../@types/ProcessCommon.ts';
import type { EcosystemContext } from '../../../../../../@types/EcosystemContext.ts';

export async function handleDumpProcessModule(context: EcosystemContext, proc: ProcessCommon): Promise<void> {
  await dump(proc, { depth: 2 });
  await line(``);
}
