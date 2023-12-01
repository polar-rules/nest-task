import { Transformers } from "@transformers/index.js";

/**
 * Prints a prettified message to the console using the `Transformers.Prettify` function.
 *
 * @function _Prettify
 * @param {string} message - The message to be prettified and printed.
 * @returns {void}
 */
export function _Prettify(message: string): void {
    console.info(Transformers.Prettify(message, "white"));
}
