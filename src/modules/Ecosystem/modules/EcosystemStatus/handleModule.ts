import { line } from 'proprompt';
import type { EcosystemContext } from '../../../../@types/EcosystemContext.ts';
import { printEcosystemStatusTable } from '../../../../tools/printEcosystemStatusTable.ts';

export async function handleEcosystemStatusModule(context: EcosystemContext): Promise<void> {
  await printEcosystemStatusTable(context);
  await line(``);
}
