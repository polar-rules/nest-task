import { INestApplication, Logger } from "@nestjs/common";

import { Interfaces } from "@interfaces/index.js";

/**
 * Namespace containing various types used in the NestTask application.
 *
 * @namespace
 */
export namespace _Types {
    /**
     * Namespace containing types related to the performance of tasks.
     *
     * @namespace
     */
    export namespace Perform {
        /**
         * Function type to resolve dependencies for task execution.
         */
        export type ResolveDependencies = (dependency: Interfaces.General.AnyClass, index: number) => any | undefined;

        /**
         * Type representing possible argument types for task execution.
         */
        export type Argument = string | number | boolean | undefined | null | INestApplication | Logger;
    }
}
