import type { EcosystemContext } from '../../../../../../@types/EcosystemContext.ts';
import type { ProcessCommon } from '../../../../../../@types/ProcessCommon.ts';
import { execCommand } from '../../../../../../tools/execCommand.ts';

export async function handleStartApplicationModule(context: EcosystemContext, proc: ProcessCommon): Promise<boolean> {
  return await execCommand(context, proc, {
    action: `start`,
  });
}
