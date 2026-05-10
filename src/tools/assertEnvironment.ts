import { assert } from './assert.ts';

const message = `Environment should be defined`;

export function assertEnvironment<
  T extends undefined | null | string,
>(environment: undefined extends T ? T : null extends T ? T : never): asserts environment is Exclude<undefined extends T ? T : null extends T ? T : never, undefined | null> {
  assert(environment, message);
  if ( ! environment) {
    throw new Error(message);
  }
}
