import fs from 'node:fs';
import { message } from 'proprompt';
import type { ProcessCommon } from '../@types/ProcessCommon.ts';
import type { ClearLogFilesOpts } from './@types/ClearLogFilesOpts.ts';

export async function clearLogFiles(proc: ProcessCommon, opts?: ClearLogFilesOpts): Promise<void> {
  const moduleOutLogPath = proc.moduleOutLogPath!;
  const moduleErrorLogPath = proc.moduleErrorLogPath!;
  const pm2OutLogPath = proc.pm2NormalizedProcess!.pm2OutLogPath!;
  const pm2ErrorLogPath = proc.pm2NormalizedProcess!.pm2ErrorLogPath!;

  if (opts?.delete) {
    await deleteFile(moduleOutLogPath);
    await deleteFile(moduleErrorLogPath);
    await deleteFile(pm2OutLogPath);
    await deleteFile(pm2ErrorLogPath);
  }
  else {
    await truncateFile(moduleOutLogPath);
    await truncateFile(moduleErrorLogPath);
    await truncateFile(pm2OutLogPath);
    await truncateFile(pm2ErrorLogPath);
  }
}

async function truncateFile(filePath: string) {
  await message(`Truncate file ` + filePath, { as: `warning` });
  if (fs.existsSync(filePath)) {
    fs.truncateSync(filePath, 0);
  }
}

async function deleteFile(filePath: string) {
  await message(`Delete file ` + filePath, { as: `warning` });
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }
}
