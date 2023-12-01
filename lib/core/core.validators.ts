import { Interfaces } from "@interfaces/index.js";

import { _Errors } from "./errors/index.js";

/**
 * Namespace containing validation functions used in the NestTask application.
 *
 * @namespace
 */
export namespace _Validators {
    /**
     * Namespace containing validation functions related to task performance.
     *
     * @namespace
     */
    export namespace Perform {
        /**
         * Validates an array of dependencies for task execution.
         *
         * @function
         * @param {(Interfaces.General.AnyClass | undefined)[]} dependencies - The array of dependencies to validate.
         * @throws {_Errors.CannotResolveDependencies} Thrown when there is an undefined dependency in the array.
         * @returns {void} Nothing in return if validation is passed
         */
        export function validateDependencies(dependencies: (Interfaces.General.AnyClass | undefined)[]): void | never {
            if (dependencies.length === 0) {
                return;
            }

            const undefinedIndex = dependencies.findIndex(
                (dependency: Interfaces.General.AnyClass | undefined): boolean => dependency === undefined,
            );

            if (undefinedIndex === -1) {
                return;
            }

            throw new _Errors.CannotResolveDependencies(undefinedIndex);
        }
    }
}
