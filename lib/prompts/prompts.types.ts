/**
 * Namespace containing types related to prompts.
 *
 * @namespace _Types
 */
export namespace _Types {
    /**
     * Namespace containing types related to project names.
     *
     * @namespace ProjectName
     */
    export namespace ProjectName {
        /**
         * Interface representing the prompt for a project name.
         *
         * @interface Prompt
         */
        export interface Prompt {
            projectName: string;
        }
    }

    /**
     * Namespace containing types related to task names.
     *
     * @namespace TaskName
     */
    export namespace TaskName {
        /**
         * Interface representing the prompt for a task name.
         *
         * @interface Prompt
         */
        export interface Prompt {
            taskName: string;
        }
    }
}
