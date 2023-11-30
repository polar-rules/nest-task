/**
 * Base custom error class that extends the built-in Error class.
 *
 * @class _Base
 * @extends {Error}
 */
export class _Base extends Error {
    /**
     * Indicates whether the error is custom.
     *
     * @type {boolean}
     * @readonly
     */
    public readonly custom: boolean = true;

    /**
     * Creates an instance of the custom error.
     *
     * @param {string} text - The error message text.
     */
    public constructor(text: string) {
        super(text);
    }
}
