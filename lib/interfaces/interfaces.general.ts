export namespace _General {
    export interface AnyClass<Instance, Arguments extends any[]> {
        new (...args: Arguments): Instance;
    }
}
