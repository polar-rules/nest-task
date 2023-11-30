import { Errors } from "@errors/index.js";

/**
 * Represents an error class for cases where the execution class is not inherited
 * from the `Abstractions::Runner` class.
 *
 * @class _NotRunnerSubclass
 * @extends Errors.Base
 */
export class _NotRunnerSubclass extends Errors.Base {
    /**
     * Creates a new instance of the `_NotRunnerSubclass` error.
     *
     * @constructor
     */
    constructor() {
        super(
            "Execution class is not inherited from `Abstractions::Runner` class. Check your `runner` key in `@Task` definition",
        );
    }
}
