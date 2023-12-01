import { Errors } from "@errors/index.js";

/**
 * Represents a custom error class for cases where the module name is missing while executing a script.
 * @class _MissingName
 * @extends Errors.Base
 */
export class _MissingName extends Errors.Base {
    /**
     * Creates an instance of _MissingName.
     * @constructor
     */
    public constructor() {
        super("Could not retrieve the module name while executing the script!");
    }
}
