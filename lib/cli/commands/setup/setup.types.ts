import { Core } from "@core/index.js";

/**
 * Namespace containing types related to expected arguments for a setup task.
 *
 * @namespace _Types
 */
export namespace _Types {
    /**
     * Interface representing expected arguments for a setup task, including an optional project name
     * and a naming convention from Core.ProjectConfiguration.Abstractions.Enums.Conventions.
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

        /**
         * The naming convention for the project.
         *
         * @type {Core.ProjectConfiguration.Abstractions.Enums.Conventions}
         */
        convention: Core.ProjectConfiguration.Abstractions.Enums.Conventions;
    }
}
