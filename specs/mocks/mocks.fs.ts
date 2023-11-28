import mockFS from "mock-fs";

export namespace _Fs {
    export function merge(...args: Record<string, any>[]): void {
        mockFS(Object.assign({}, ...args));
    }

    export function clean(): void {
        mockFS.restore();
    }
}
