/**
 * Namespace containing types related to expected arguments for a task.
 *
 * @namespace _Types
 */
export namespace _Types {
    /**
     * Interface representing expected arguments for a task, including a task name, an optional project name,
     * and additional dynamic key-value pairs.
     *
     * @interface ExpectedArguments
     * @extends {Record<string, string | number>}
     */
    export interface ExpectedArguments extends Record<string, string | number> {
        /**
         * The name of the task.
         *
         * @type {string}
         */
        name: string;

        /**
         * The name of the project (optional).
         *
         * @type {string | undefined}
         */
        projectName?: string;
    }
}
