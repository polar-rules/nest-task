/**
 * Namespace containing enums related to commands.
 *
 * @namespace _Enums
 */
export namespace _Enums {
    /**
     * Enumeration of commands for Jest configuration tasks.
     *
     * @enum {string}
     * @readonly
     */
    export enum Commands {
        /**
         * Represents the 'config' command. Expected this as an argument to the
         * 'jest.runner' what will represent that you want to generate new
         * Jest config file.
         */
        Config = "config",
    }
}
