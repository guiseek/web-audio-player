export function castArrayToObject<T>(array: T[]) {
  return array.reduce((acc, curr) => ({ ...acc, ...curr }), {});
}
