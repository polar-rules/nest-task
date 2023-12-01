import { Errors } from "@errors/index.js";

/**
 * Represents an error class indicating that the main file already exists.
 *
 * @class _MainAlreadyExist
 * @extends Errors.Base
 */
export class _MainAlreadyExist extends Errors.Base {
    /**
     * Creates a new instance of the `_MainAlreadyExist` error.
     *
     * @constructor
     * @param {string} path - The path of the existing main file.
     */
    constructor(path: string) {
        super(`File \`${path}\` already exists!`);
    }
}
