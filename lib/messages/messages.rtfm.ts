import { Transformers } from "@transformers/index.js";

import { _Types } from "./messages.types.js";

/**
 * Prints a "Read the Friendly Manual" (RTFM) message to the console using the `Transformers.Prettify` function.
 *
 * @function _Rtfm
 * @param {Object} options - Options for controlling the message format.
 * @param {boolean} [options.before=false] - Whether to print an additional newline before the message.
 * @param {boolean} [options.after=false] - Whether to print an additional newline after the message.
 * @returns {void}
 */
export function _Rtfm({ before, after }: _Types.Rtfm.Options): void {
    if (before) {
        console.info("");
    }

    console.info(Transformers.Prettify("Please, use `nest-task help` for additional information.", "white"));

    if (after) {
        console.info("");
    }
}
