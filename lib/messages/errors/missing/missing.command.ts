import { _Chalk } from "@messages/messages.chalk.js";

import { _Rtfm } from "@messages/messages.rtfm.js";

export function _Command(): never {
    console.error("Incorrect arguments!", "You need to pass", _Chalk.cyan("`command`"), "as a first argument.");

    _Rtfm({ before: true, after: false });

    process.exit(1);
}
