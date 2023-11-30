import { Errors } from "@errors/index.js";

/**
 * Represents an error indicating the absence of a specific task.
 *
 * @class _NoSpecificTaskFound
 * @extends Errors.Base
 * @param {string} taskName - The name of the task that couldn't be located.
 */
export class _NoSpecificTaskFound extends Errors.Base {
    /**
     * Creates an instance of _NoSpecificTaskFound.
     *
     * @constructor
     * @description Constructs an error indicating the inability to locate a task with the given name.
     * @param {string} taskName - The name of the task that couldn't be located.
     */
    constructor(taskName: string) {
        super(`Unable to locate task with name: \`${taskName}\`!`);
    }
}
