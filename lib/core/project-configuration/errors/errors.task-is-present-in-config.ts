import { Errors } from "@errors/index.js";

/**
 * Represents an error class indicating that the `task` key declaration is already present in `nest-cli.json`.
 *
 * @class _TaskIsPresentInConfig
 * @extends Errors.Base
 */
export class _TaskIsPresentInConfig extends Errors.Base {
    /**
     * Creates a new instance of the `_TaskIsPresentInConfig` error.
     *
     * @constructor
     */
    constructor() {
        super("The `task` key declaration is already present in `nest-cli.json`.");
    }
}
