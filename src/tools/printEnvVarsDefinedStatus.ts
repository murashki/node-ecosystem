import c from 'chalk';
import { line } from 'proprompt';

export async function printEnvVarsDefinedStatus(requiredEnvs: string[], source: Record<string, any>): Promise<void> {
  await line(
    requiredEnvs
      .map((envVariableName) => {
        return envVariableName in source
          ? `${c.gray(`${envVariableName}:`)} ${c.bold(c.green(`ok`))}`
          : `${envVariableName}${c.gray(`:`)} ${c.bold(c.red(`not defined`))}`;
      })
      .join(`\n`),
  );
}
