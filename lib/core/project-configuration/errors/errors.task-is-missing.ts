import { Errors } from "@errors/index.js";

/**
 * Represents an error class indicating that the `task` key declaration is missing in `nest-cli.json`.
 *
 * @class _TaskIsMissing
 * @extends Errors.Base
 */
export class _TaskIsMissing extends Errors.Base {
    /**
     * Creates a new instance of the `_TaskIsMissing` error.
     *
     * @constructor
     */
    constructor() {
        super("The `task` key declaration is missing in `nest-cli.json`.");
    }
}
