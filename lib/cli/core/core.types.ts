import { Core } from "@core/index.js";
import { Messages } from "@messages/index.js";

/**
 * Represents a namespace for custom types related to the Cli::Core namespace.
 * @namespace _Types
 */
export namespace _Types {
    /**
     * Represents custom types related to information processing in the _Info class.
     * @namespace Info
     */
    export namespace Info {
        /**
         * Defines the type for processing tasks in the _Info class.
         * @type {ProcessTasks}
         */
        export type ProcessTasks = (task: Core.Task) => Messages.Types.FoundTasks.Options;
    }
}
