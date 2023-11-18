import { _Chalk } from "@messages/messages.chalk.js";

import { Transformers } from "@transformers/index.js";

import { _Rtfm } from "@messages/messages.rtfm.js";

export function _Argument(name: string[]): never {
    console.error(Transformers.Prettify("Missing arguments!", "red"));
    console.error(
        _Chalk.red("You need to pass"),
        Transformers.Prettify(name.map((n: string): string => `\`--${n}\``).join(_Chalk.red(" and ")), "red"),
        _Chalk.red("name as an argument."),
    );

    _Rtfm({ before: true, after: false });

    process.exit(1);
}
