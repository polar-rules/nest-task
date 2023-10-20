export namespace _Essentials {
    let originalArgv: string[] = [];

    export namespace Before {
        export namespace Each {
            export function prepareArgv(): void {
                originalArgv = process.argv;
                process.argv.push("--test");
            }
        }
    }

    export namespace After {
        export namespace Each {
            export function restoreArgv(): void {
                process.argv = originalArgv;
            }
        }
    }
}
