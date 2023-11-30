import { _Chalk } from "@messages/messages.chalk.js";
import { _Rtfm } from "@messages/messages.rtfm.js";

/**
 * Log an error message indicating incorrect command-line arguments and provides guidance.
 *
 * @returns {never} - Exits the process with an error code.
 */
export function _Command(): never {
    console.error("Incorrect arguments!", "You need to pass", _Chalk.cyan("`command`"), "as a first argument.");

    _Rtfm({ before: true, after: false });

    process.exit(1);
}
