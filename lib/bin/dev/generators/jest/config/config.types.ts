export namespace _Types {
    export namespace Jest {
        export interface ApproximateConfig {
            moduleNameMapper: Record<string, string[]>;
        }
    }

    export namespace Typescript {
        interface ApproximateCompilerOptions {
            paths: Record<string, string[]>;
        }

        export interface ApproximateConfig {
            compilerOptions: ApproximateCompilerOptions;
        }
    }

    export namespace Main {
        export type StringAndArrayOfStrings = [string, string[]];

        export interface Aliases {
            key?: string;
            value?: string[];
        }
    }
}
