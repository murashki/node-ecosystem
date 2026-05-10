import { required } from './required.ts';

const message = `Environment should be defined`;

export function requiredEnvironment<
  T extends undefined | null | string,
>(environment: undefined extends T ? T : null extends T ? T : never): NonNullable<T> {
  const definedEnvironment = required(environment, message);
  if ( ! definedEnvironment) {
    throw new Error(message);
  }
  return definedEnvironment;
}
