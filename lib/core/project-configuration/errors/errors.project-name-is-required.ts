import { Errors } from "@errors/index.js";

/**
 * Represents an error class indicating that the `projectName` is required.
 *
 * @class _ProjectNameIsRequired
 * @extends Errors.Base
 */
export class _ProjectNameIsRequired extends Errors.Base {
    /**
     * Creates a new instance of the `_ProjectNameIsRequired` error.
     *
     * @constructor
     */
    constructor() {
        super("You need to select `projectName`.");
    }
}
