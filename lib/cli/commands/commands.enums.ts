/**
 * Namespace containing enums related to commands.
 *
 * @namespace _Enums
 */
export namespace _Enums {
    /**
     * Enum representing different commands.
     *
     * @enum {string}
     */
    export enum Commands {
        /**
         * Command for displaying help information.
         *
         * @type {string}
         */
        Help = "help",

        /**
         * Command for creating tasks.
         *
         * @type {string}
         */
        Create = "create",

        /**
         * Command for retrieving information.
         *
         * @type {string}
         */
        Info = "info",

        /**
         * Command for running tasks.
         *
         * @type {string}
         */
        Run = "run",

        /**
         * Command for setting up tasks.
         *
         * @type {string}
         */
        Setup = "setup",
    }
}
