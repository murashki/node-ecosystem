import type { EcosystemContext } from '../../../../@types/EcosystemContext.ts';
import { execProcCommand } from '../../../../tools/execProcCommand.ts';

export async function handleStopIndividualApplicationModule(context: EcosystemContext): Promise<void> {
  await execProcCommand(context, {
    action: `stop`,
  });
}
