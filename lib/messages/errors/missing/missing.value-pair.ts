import { Transformers } from "@transformers/index.js";

import { _Chalk } from "@messages/messages.chalk.js";
import { _Rtfm } from "@messages/messages.rtfm.js";

/**
 * Log an error message indicating an issue with named arguments, specifically when unable to detect a value pair.
 * Provides guidance on the correct syntax.
 *
 * @param {string} key - The key for which the value pair is missing.
 * @returns {void} - Exits the process with an error code.
 */
export function _ValuePair(key: string): void {
    console.error(_Chalk.red("Something is wrong with named arguments!"));
    console.error(Transformers.Prettify(`Unable to detect value pair for argument \`${key}\`.`, "red"));
    console.info("");
    console.info("Did you forget to add it?");
    console.info("");
    console.info("The valid syntax is", _Chalk.cyan("`nest-task <command> --key value`"));

    _Rtfm({ before: true, after: false });
}
