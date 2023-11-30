import { _Chalk } from "./messages.chalk.js";
import { _Types } from "./messages.types.js";

/**
 * Prints a message indicating that the project setup is complete.
 *
 * @function _SetupComplete
 * @param {Object} options - Options for controlling the message format.
 * @param {boolean} [options.space=false] - Whether to print an additional newline after the message.
 * @returns {void}
 */
export function _SetupComplete({ space }: _Types.SetupComplete.Options): void {
    console.info(_Chalk.green("Your projects setup is completed!"));

    if (!space) {
        return;
    }

    console.info("");
}
