import { select } from 'proprompt';
import type { EcosystemContext } from '../@types/EcosystemContext.ts';
import type { ExecProcCommandOpts } from './@types/ExecProcCommandOpts.ts';
import { processSelect } from './processSelect.ts';
import { execCommand } from './execCommand.ts';

export async function execProcCommand(context: EcosystemContext, opts: ExecProcCommandOpts): Promise<void> {
  while (true) {
    const proc = await processSelect(context);

    if ( ! proc) {
      return;
    }

    const execResult = await execCommand(context, proc, {
      action: opts.action,
    });

    if (execResult) {
      return;
    }

    const { canceled, value } = await select({
      message: `Select an option`,
      options: [
        { value: `retry`, label: `Select another app` },
        { value: `back`, label: `Go back` },
      ],
    });

    if (canceled || value === `back`) {
      return;
    }
  }
}
