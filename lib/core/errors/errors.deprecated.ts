import { Errors } from "@errors/index.js";

/**
 * Represents an error indicating the absence of a factory instance.
 *
 * @class _NoFactoryFound
 * @extends Errors.Base
 */
export class _Deprecated extends Errors.Base {
    /**
     * Creates an instance of _NoFactoryFound.
     *
     * @constructor
     * @description Constructs an error indicating the inability to locate a factory instance.
     */
    constructor() {
        super(
            "Task that you want to run marked as deprecated. Consider remove `deprecated` flag from `@Decorators.Task()` if you desire to run this task.",
        );
    }
}
