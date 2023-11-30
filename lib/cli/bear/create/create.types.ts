/**
 * Namespace containing types related to task creation.
 *
 * @namespace _Types
 */
export namespace _Types {
    /**
     * Interface representing prompts for module name and description.
     *
     * @interface Prompt
     */
    export interface Prompt {
        /**
         * The name of the module or task.
         *
         * @type {string}
         */
        moduleName: string;

        /**
         * The description of the module or task.
         *
         * @type {string}
         */
        moduleDescription: string;
    }
}
