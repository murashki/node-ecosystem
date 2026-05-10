import type { ProcessCommon } from '../../@types/ProcessCommon.ts';
import { assert } from '../assert.ts';

export function compileStartAppCommand(proc: ProcessCommon, configFilePath: string): string {
  assert(proc.proposedProcessName, `proc.appConfig should be defined`);
  assert(proc.environment, `proc.environment should be defined`);
  return `pm2 start ${configFilePath} --only ${proc.proposedProcessName} --env ${proc.environment} && pm2 save`;
}

export function compileRestartAppCommand(proc: ProcessCommon, configFilePath: string): string {
  assert(proc.proposedProcessName, `proc.appConfig should be defined`);
  assert(proc.environment, `proc.environment should be defined`);
  assert(proc.pm2NormalizedProcess, `proc.pm2NormalizedProcess should be defined`);
  return `pm2 delete ${proc.pm2NormalizedProcess.name} && pm2 start ${configFilePath} --only ${proc.proposedProcessName} --update-env --env ${proc.environment} && pm2 save`;
}

export function compileStopAppCommand(proc: ProcessCommon): string {
  assert(proc.pm2NormalizedProcess, `proc.pm2NormalizedProcess should be defined`);
  return `pm2 stop ${proc.pm2NormalizedProcess.name} && pm2 save`;
}

export function compileDeleteAppCommand(proc: ProcessCommon): string {
  assert(proc.pm2NormalizedProcess, `proc.pm2NormalizedProcess should be defined`);
  return `pm2 delete ${proc.pm2NormalizedProcess.name} && pm2 save`;
}
