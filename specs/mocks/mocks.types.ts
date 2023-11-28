export namespace _Types {
    export namespace Console {
        export interface OriginalMethods {
            console: {
                info: typeof console.info;
                error: typeof console.error;
                log: typeof console.log;
            };
        }
    }

    export namespace Process {
        export interface OriginalMethods {
            process: {
                exit: typeof process.exit;
            };
        }
    }

    export namespace Templates {
        export interface Templates {
            entrypointPath: string;
            modulePath: string;
            taskPath: string;
            runnerPath: string;
            indexPath: string;
        }
    }
}
