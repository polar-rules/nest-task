import { Transformers } from "@transformers/index.js";

import { _Types } from "./messages.types.js";

export function _Rtfm({ before, after }: _Types.Rtfm.Options): void {
    if (before) {
        console.info("");
    }

    console.info(Transformers.Prettify("Please, use `nest-task help` for additional information.", "white"));

    if (after) {
        console.info("");
    }
}
