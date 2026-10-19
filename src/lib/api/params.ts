export function cleanParams<T extends object>(params: T) { return Object.fromEntries(Object.entries(params).filter(([, value]) => value !== undefined && value !== '')) }
