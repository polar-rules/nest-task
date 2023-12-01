import { Errors } from "@errors/index.js";

/**
 * Represents an error indicating the absence of a factory instance.
 *
 * @class _NoFactoryFound
 * @extends Errors.Base
 */
export class _NoFactoryFound extends Errors.Base {
    /**
     * Creates an instance of _NoFactoryFound.
     *
     * @constructor
     * @description Constructs an error indicating the inability to locate a factory instance.
     */
    constructor() {
        super("Unable to locate factory instance!");
    }
}
