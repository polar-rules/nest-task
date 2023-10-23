export class _CannotResolveDependencies extends Error {
    constructor(index: number) {
        super(`Cannot resolve dependency for @Runner() at index ${index}`);
    }
}
