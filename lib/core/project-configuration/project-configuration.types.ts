import { _Abstractions } from "./abstractions/index.js";

/**
 * Namespace containing types related to project configuration.
 *
 * @namespace _Types
 */
export namespace _Types {
    /**
     * Represents the structure of a task.
     *
     * @type {_Abstractions.Types.FileResolver.ApproximateTask}
     */
    export type Task = _Abstractions.Types.FileResolver.ApproximateTask;

    /**
     * Namespace containing configuration interfaces.
     *
     * @namespace Configuration
     */
    export namespace Configuration {
        /**
         * Interface representing the approximate structure of a project in the configuration.
         *
         * @interface ApproximateProject
         */
        export interface ApproximateProject {
            type: string;
            root: string;
            entryFile: string;
            sourceRoot: string;
            task?: Task;
        }

        /**
         * Interface representing the approximate structure of a configuration with multiple projects.
         *
         * @interface ApproximateWithProjects
         */
        export interface ApproximateWithProjects {
            projects: Record<string, ApproximateProject>;
        }

        /**
         * Interface representing the approximate structure of a configuration.
         *
         * @interface Approximate
         * @extends {Partial<ApproximateWithProjects>}
         */
        export interface Approximate extends Partial<ApproximateWithProjects> {
            sourceRoot?: string;
            task?: Task;
        }
    }
}
