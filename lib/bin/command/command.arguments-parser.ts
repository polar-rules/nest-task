import { Messages } from "@messages/index.js";
import { Patches } from "@patches/index.js";

/**
 * Module parsing arguments and transpiling it into plain JS object
 *
 * @class _ArgumentsParser
 */
export class _ArgumentsParser {
    public constructor() {}

    /**
     * Extract arguments from process.argv
     *
     * This function processes command-line arguments, extracts key-value pairs, and return them
     * @function
     * @returns {Record<string, any>} A resolve object of arguments
     */
    public parse(): Record<string, any> {
        const argumentKeys = process.argv.filter((item: string): boolean => item.includes("--"));

        const keyValuePair = argumentKeys.map((key: string): [string, string] => {
            const indexOfArgument = process.argv.indexOf(key);
            const value = process.argv[indexOfArgument + 1];

            if (!value) {
                Messages.Errors.Missing.ValuePair(key);
                process.exit(1);
            }

            const patchedKey = new Patches.String(key.replace("--", ""));

            return [patchedKey.toCamelCase().toString(), value];
        });

        const mappedArray = new Map<string, string>(keyValuePair);

        return Object.fromEntries(mappedArray);
    }
}
