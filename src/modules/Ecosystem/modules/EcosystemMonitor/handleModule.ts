import type { EcosystemContext } from '../../../../@types/EcosystemContext.ts';
import { monitorEcosystem } from '../../../../tools/monitorEcosystem.ts';

export async function handleEcosystemMonitorModule(context: EcosystemContext): Promise<void> {
  await monitorEcosystem(context);
}
