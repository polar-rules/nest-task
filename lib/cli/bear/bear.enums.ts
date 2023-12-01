/**
 * Namespace containing enums related to actions.
 *
 * @namespace _Enums
 */
export namespace _Enums {
    /**
     * Enum representing different actions.
     *
     * @enum {string}
     */
    export enum Actions {
        /**
         * Action for retrieving information about available tasks and their description.
         *
         * @type {string}
         */
        Info = "info",

        /**
         * Action for running tasks.
         *
         * @type {string}
         */
        Run = "run",

        /**
         * Action for creating tasks.
         *
         * @type {string}
         */
        Create = "create",

        /**
         * Action for setting up the project with nest-tasks.
         *
         * @type {string}
         */
        Setup = "setup",
    }
}
