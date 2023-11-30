import { Errors } from "@errors/index.js";

/**
 * Represents an error class indicating the absence of the `nest-cli.json` file.
 *
 * @class _MissingNestCli
 * @extends Errors.Base
 */
export class _MissingNestCli extends Errors.Base {
    /**
     * Creates a new instance of the `_MissingNestCli` error.
     *
     * @constructor
     */
    constructor() {
        super("Unable to locate `nest-cli.json`.");
    }
}
