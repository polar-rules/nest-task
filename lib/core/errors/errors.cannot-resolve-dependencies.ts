import { Errors } from "@errors/index.js";

/**
 * Represents an error indicating the inability to resolve dependencies for `@Runner()` decorator.
 *
 * @class _CannotResolveDependencies
 * @extends Errors.Base
 * @param {number} index - The index at which the dependency resolution failed.
 */
export class _CannotResolveDependencies extends Errors.Base {
    /**
     * Creates an instance of _CannotResolveDependencies.
     * @constructor
     * @param {number} index - The index at which the dependency resolution failed.
     */
    constructor(index: number) {
        super(`Cannot resolve dependency for \`@Runner()\` at index \`${index}\`.`);
    }
}
