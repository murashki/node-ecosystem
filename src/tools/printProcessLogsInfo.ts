import c from 'chalk';
import { line } from 'proprompt';
import { ProcessCommon } from '../@types/ProcessCommon.ts';
import { printPm2LogFilePath } from './printPm2LogFilePath.ts';

export async function printProcessLogsInfo(process: ProcessCommon) {
  process.pm2NormalizedProcess!.pm2OutLogPath && await line(c.dim(`Process out log file: ${process.pm2NormalizedProcess!.pm2OutLogPath}`));
  process.pm2NormalizedProcess!.pm2ErrorLogPath && await line(c.dim(`Process error log file: ${process.pm2NormalizedProcess!.pm2ErrorLogPath}`));
  await printPm2LogFilePath();
}
