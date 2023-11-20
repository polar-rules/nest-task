export namespace _General {
    export interface AnyClass<Instance = any, Arguments extends any[] = any> {
        new (...args: Arguments): Instance;
    }
}
