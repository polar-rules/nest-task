import mockFS from "mock-fs";

export namespace _Fs {
    export function clean(): void {
        mockFS.restore();
    }
}
