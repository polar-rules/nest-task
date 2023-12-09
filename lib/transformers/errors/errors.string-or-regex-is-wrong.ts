import { Errors } from "@errors/index.js";

/**
 * Custom error class for cases where there is an issue with a regular expression.
 *
 * @class _StringOrRegexIsWrong
 * @extends {Error}
 */
export class _StringOrRegexIsWrong extends Errors.Base {
    /**
     * Creates an instance of _StringOrRegexIsWrong.
     *
     * @constructor
     * @description This error is thrown when there is something wrong with a regular expression.
     */
    public constructor() {
        super("There is something wrong with Regex.");
    }
}
