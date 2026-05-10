export function required<
  T extends any,
>(value: undefined extends T ? T : null extends T ? T : never, message?: string | Error): NonNullable<T> {
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
  return value;
}
