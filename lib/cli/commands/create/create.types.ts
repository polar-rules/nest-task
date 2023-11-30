/**
 * Namespace containing types related to expected arguments.
 *
 * @namespace _Types
 */
export namespace _Types {
    /**
     * Interface representing expected arguments for a module creation task.
     *
     * @interface ExpectedArguments
     */
    export interface ExpectedArguments {
        /**
         * The name of the module.
         *
         * @type {string}
         */
        name: string;

        /**
         * The description of the module.
         *
         * @type {string}
         */
        description: string;

        /**
         * The name of the project (optional).
         *
         * @type {string | undefined}
         */
        projectName?: string;
    }
}
