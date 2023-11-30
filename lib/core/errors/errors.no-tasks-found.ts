import { Errors } from "@errors/index.js";

/**
 * Represents an error indicating the absence of any tasks.
 *
 * @class _NoTasksFound
 * @extends Errors.Base
 */
export class _NoTasksFound extends Errors.Base {
    /**
     * Creates an instance of _NoTasksFound.
     *
     * @constructor
     * @description Constructs an error indicating the inability to locate any tasks.
     */
    constructor() {
        super("Unable to locate any tasks!");
    }
}
