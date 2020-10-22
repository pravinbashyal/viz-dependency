export function withoutUndefined<T>(value: T | undefined): value is T {
  return value !== undefined
}
