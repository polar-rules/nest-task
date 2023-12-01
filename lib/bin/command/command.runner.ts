/**
 * Module for executing command-line tasks.
 *
 * @module _Runner
 */

import { Messages } from "@messages/index.js";

import { Cli } from "@cli/index.js";
import { Patches } from "@patches/index.js";

/**
 * Executes command-line tasks based on the provided command and arguments.
 *
 * This function processes command-line arguments, extracts key-value pairs, and runs the corresponding command.
 * @function
 * @async
 * @returns {Promise<void>} A Promise that resolves once the command-line task is complete.
 */
export async function _Runner(): Promise<void> {
    const command = process.argv.at(2);

    if (!command) {
        Messages.Errors.Missing.Command();
    }

    const otherArguments = process.argv.slice(3);
    const argumentKeys = otherArguments.filter((item: string): boolean => item.includes("--"));

    const keyValuePair = argumentKeys.map((key: string): [string, string] => {
        const indexOfArgument = otherArguments.indexOf(key);
        const value = otherArguments[indexOfArgument + 1];

        if (!value) {
            Messages.Errors.Missing.ValuePair(key);
        }

        const patchedKey = new Patches.String(key.replace("--", ""));

        return [patchedKey.toCamelCase().toString(), value];
    });

    const mappedArray = new Map<string, string>(keyValuePair);
    const mappedArguments = Object.fromEntries(mappedArray);

    await new Cli.Commands.Main(<Cli.Commands.Enums.Commands>command, mappedArguments).run();
}
