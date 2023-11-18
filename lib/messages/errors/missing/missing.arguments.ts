import { _Chalk } from "@messages/messages.chalk.js";

import { _Rtfm } from "@messages/messages.rtfm.js";

export function _Arguments(): never {
    console.error(_Chalk.red("Missing arguments. Please use `nest-task help` for more information"));

    _Rtfm({ before: true, after: false });

    process.exit(1);
}
