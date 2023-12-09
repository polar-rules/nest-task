import { _Chalk } from "@messages/messages.chalk.js";
import { _Rtfm } from "@messages/messages.rtfm.js";

/**
 * Log an error message indicating missing command-line arguments and provides guidance.
 *
 * @returns {void} - Exits the process with an error code.
 */
export function _Arguments(): void {
    console.error(_Chalk.red("Missing arguments. Please use `nest-task help` for more information"));

    _Rtfm({ before: true, after: false });
}
