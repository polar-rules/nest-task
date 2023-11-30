import { _Chalk } from "@messages/messages.chalk.js";
import { _Errors } from "./errors/index.js";
import { _Types } from "./transformers.types.js";

/**
 * Prettify a text by applying colorization based on a specified color.
 *
 * @function _Prettify
 * @param {string} text - The input text to be prettified.
 * @param {_Types.Prettify.Colour} colour - The color to apply during prettification.
 * @returns {string} The prettified text with applied colorization.
 * @throws {_Errors.StringOrRegexIsWrong} Throws an error if the prettified message is empty.
 */
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
