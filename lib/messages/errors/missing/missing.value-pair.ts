import { Transformers } from "@transformers/index.js";

import { _Chalk } from "@messages/messages.chalk.js";
import { _Rtfm } from "@messages/messages.rtfm.js";

export function _ValuePair(key: string): never {
    console.error(_Chalk.red("Something is wrong with named arguments!"));
    console.error(Transformers.Prettify(`Unable to detect value pair for argument \`${key}\`.`, "red"));
    console.info("");
    console.info("Did you forgot to add it?");
    console.info("");
    console.info("The valid syntax is", _Chalk.cyan("`nest-task <command> --key value`"));

    _Rtfm({ before: true, after: false });

    process.exit(1);
}
