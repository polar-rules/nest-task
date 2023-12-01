/**
 * Represents custom types and interfaces within the `_Types` namespace.
 *
 * @namespace _Types
 */
export namespace _Types {
    /**
     * Represents custom types related to Jest configuration within the `_Types` namespace.
     *
     * @namespace Jest
     */
    export namespace Jest {
        /**
         * Represents an approximate configuration for Jest.
         *
         * @interface ApproximateConfig
         */
        export interface ApproximateConfig {
            moduleNameMapper: Record<string, string[]>;
        }
    }

    /**
     * Represents custom types related to TypeScript within the `_Types` namespace.
     *
     * @namespace Typescript
     */
    export namespace Typescript {
        /**
         * Represents approximate compiler options for TypeScript.
         *
         * @interface ApproximateCompilerOptions
         */
        interface ApproximateCompilerOptions {
            paths: Record<string, string[]>;
        }

        /**
         * Represents an approximate configuration for TypeScript.
         *
         * @interface ApproximateConfig
         */
        export interface ApproximateConfig {
            compilerOptions: ApproximateCompilerOptions;
        }
    }

    /**
     * Represents custom types for the `Main` namespace within the `_Types` namespace.
     *
     * @namespace Main
     */
    export namespace Main {
        /**
         * Represents a tuple containing a string and an array of strings.
         *
         * @type {StringAndArrayOfStrings}
         */
        export type StringAndArrayOfStrings = [string, string[]];

        /**
         * Represents an object with properties `key` and `value`, used for defining aliases.
         *
         * @interface Aliases
         */
        export interface Aliases {
            key?: string;
            value?: string[];
        }
    }
}
