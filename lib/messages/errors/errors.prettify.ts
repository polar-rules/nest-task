import { Errors } from "@errors/index.js";
import { Transformers } from "@transformers/index.js";

/**
 * Log a prettified error message and exit the process with an error code.
 *
 * @param {Errors.Base} error - The error object to be prettified.
 * @returns {void} - Exits the process with an error code.
 */
export function _Prettify(error: Errors.Base): void {
    console.error(Transformers.Prettify(error.message, "red"));
}
