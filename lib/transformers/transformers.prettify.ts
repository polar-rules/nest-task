import { _Chalk } from "@messages/messages.chalk.js";

import { _Errors } from "./errors/index.js";
import { _Types } from "./transformers.types.js";

export function _Prettify(text: string, colour: _Types.Prettify.Colour): string | never {
    const pattern = /(`[^`]+`)|\S+|\s+/g;
    const resultArray = text.match(pattern);

    const message = resultArray
        ?.map((item: string): string => {
            switch (true) {
                case item.includes("`"):
                    return _Chalk.cyan(item);
                default:
                    return _Chalk[colour](item);
            }
        })
        ?.join("");

    if (!message) {
        throw new _Errors.StringOrRegexIsWrong();
    }

    return message;
}
