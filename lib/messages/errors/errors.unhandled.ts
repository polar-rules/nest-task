import { _Chalk } from "@messages/messages.chalk.js";

/**
 * Log an unhandled error and throw the error again.
 *
 * @param {unknown} error - The unhandled error to be logged and thrown.
 * @returns {never} - Throws the error again.
 */
export function _Unhandled(error: unknown): never {
    console.error(_Chalk.red("Unhandled error occurred. The trace is available below."));

    throw error;
}
