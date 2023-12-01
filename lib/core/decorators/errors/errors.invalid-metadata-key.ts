import { Errors } from "@errors/index.js";

/**
 * Represents an error class for invalid metadata keys used in the @Task() decorator.
 *
 * @class _InvalidMetadataKey
 * @extends Errors.Base
 */
export class _InvalidMetadataKey extends Errors.Base {
    /**
     * Creates an instance of `_InvalidMetadataKey`.
     *
     * @param {string} key - The invalid metadata key.
     */
    constructor(key: string) {
        /**
         * Error message for the invalid metadata key.
         *
         * @member {string} message
         * @memberof _InvalidMetadataKey
         * @readonly
         */
        super(`Invalid property '${key}' passed into the @Task() decorator`);
    }
}
