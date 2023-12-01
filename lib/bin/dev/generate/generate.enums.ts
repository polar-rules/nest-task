/**
 * Namespace containing enums related to commands.
 *
 * @namespace _Enums
 */
export namespace _Enums {
    /**
     * Enumeration of commands for various dev-only tasks.
     *
     * @enum {string}
     * @readonly
     */
    export enum Commands {
        /**
         * Represents the 'assembler' command. Expected this as an argument to the
         * 'generate.runner' what will represent that you want to generate new
         * 'index.ts' files for whole project.
         */
        Assembler = "assembler",
        /**
         * Represents the 'config' command. Expected this as an argument to the
         * 'generate.runner' what will represent that you want to perform operations
         * related to 'jest' namespace
         */
        Jest = "jest",
    }
}
