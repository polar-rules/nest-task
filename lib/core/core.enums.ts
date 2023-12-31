/**
 * Contains enumerations related to the NestTask application.
 *
 * @namespace
 */
export namespace _Enums {
    /**
     * Enumerates the possible run types for the application.
     *
     * @enum {string}
     */
    export enum RunTypes {
        /**
         * Represents the "info" run type.
         */
        Info = "info",

        /**
         * Represents the "run" run type.
         */
        Run = "run",
    }

    /**
     * Enumerates metadata keys used in the application.
     *
     * @enum {string}
     */
    export enum MetadataKeys {
        /**
         * Metadata key for tasks list.
         */
        TasksList = "metadata:tasks-list",

        /**
         * Metadata key for task name.
         */
        TaskName = "metadata:task-name",

        /**
         * Metadata key for task arguments.
         */
        TaskArguments = "metadata:task-arguments",

        /**
         * Metadata key for run type.
         */
        RunType = "metadata:run-type",

        /**
         * Metadata key for execution source.
         */
        ExecutionSource = "metadata:execution-source-type",
    }

    /**
     * Enumerates the possible execution types for the application.
     *
     * @enum {string}
     */
    export enum ExecutionSourceTypes {
        /**
         * Represents the "command" execution type.
         */
        Command = "command",

        /**
         * Represents the "bear" execution type.
         */
        Bear = "bear",

        /**
         * Represents the "direct" execution type.
         */
        Direct = "direct",
    }
}
