/**
 * Represents constants within the `_Constants` namespace.
 * @namespace _Constants
 */
export namespace _Constants {
    /**
     * Represents constants related to Jest configuration.
     * @namespace Jest
     */
    export namespace Jest {
        /**
         * The file name for Jest configuration.
         * @type {Readonly<string>}
         */
        export const fileName: Readonly<string> = "jest.config.json";
    }

    /**
     * Represents constants related to TypeScript configuration.
     * @namespace Typescript
     */
    export namespace Typescript {
        /**
         * The file name for TypeScript configuration.
         * @type {Readonly<string>}
         */
        export const fileName: Readonly<string> = "tsconfig.json";
    }
}
