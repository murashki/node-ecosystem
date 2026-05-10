import c from 'chalk';
import pm2 from 'pm2';
import { line } from 'proprompt';

export async function printPm2LogFilePath() {
  await line(c.dim(`Pm2 log file: ${(pm2 as any).pm2_home}/pm2.log`));
}
