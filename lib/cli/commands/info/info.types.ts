/**
 * Namespace containing types related to expected arguments.
 *
 * @namespace _Types
 */
export namespace _Types {
    /**
     * Interface representing expected arguments for a task with an optional project name.
     *
     * @interface ExpectedArguments
     */
    export interface ExpectedArguments {
        /**
         * The name of the project (optional).
         *
         * @type {string | undefined}
         */
        projectName?: string;
    }
}
