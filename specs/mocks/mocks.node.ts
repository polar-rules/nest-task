export namespace _Node {
    export namespace Dirname {
        const originalMethod = global.__dirname;

        export function mock(value: string): void {
            global.__dirname = value;
        }

        export function clean(): void {
            global.__dirname = originalMethod;
        }
    }
}
