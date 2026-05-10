import pm2 from 'pm2';
import type { Pm2NormalizedProcess } from '../../@types/Pm2NormalizedProcess.ts';
import { withResolvers } from '../withResolvers.ts';
import type { RestartOpts } from './@types/RestartOpts.ts';
import { normalize } from './normalize.ts';

export const pm2Client = {
  connect,
  list,
  restart,
};

async function connect() {
  const { promise, resolve, reject } = withResolvers<void>();
  pm2.connect((error: Error) => (error ? reject(error) : resolve()));
  return promise;
}

async function list() {
  const { promise, resolve, reject } = withResolvers<Pm2NormalizedProcess[]>();
  pm2.list((error: Error, procs) => (error ? reject(error) : resolve(procs.map((proc) => normalize(proc)))));
  return promise;
}

function restart(process: string, opts: RestartOpts = {}) {
  const { promise, resolve, reject } = withResolvers<void>();
  // @ts-ignore In this case the `pm2` type definitions do not match the implementation
  pm2.restart(process, opts, (error: Error) => (error ? reject(error) : resolve()));
  return promise;
}
