import { Core } from "@core/index.js";

/**
 * Namespace containing types related to setup tasks.
 *
 * @namespace _Types
 */
export namespace _Types {
    /**
     * Interface representing prompts for selecting naming conventions.
     *
     * @interface Prompt
     */
    export interface Prompt {
        /**
         * The selected naming convention for the project.
         *
         * @type {Core.ProjectConfiguration.Abstractions.Enums.Conventions}
         */
        naming: Core.ProjectConfiguration.Abstractions.Enums.Conventions;
    }
}
