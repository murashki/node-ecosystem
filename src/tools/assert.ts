export function assert<
  T extends any,
>(value: undefined extends T ? T : null extends T ? T : never, message?: string | Error): asserts value is Exclude<undefined extends T ? T : null extends T ? T : never, undefined | null> {
  if (value == null) {
    if (typeof message === `string`) {
      throw new Error(message);
    }
    else if (message != null) {
      throw message;
    }
    else {
      throw new Error(`A value should not be nullish`);
    }
  }
}
