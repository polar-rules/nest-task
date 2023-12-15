/**
 * Module for executing command-line tasks.
 *
 * @module _Runner
 */

import { Messages } from "@messages/index.js";

import { Cli } from "@cli/index.js";

import { _ArgumentsParser } from "./command.arguments-parser.js";

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
        process.exit(1);
    }

    const args = new _ArgumentsParser().parse();

    await new Cli.Commands.Main(<Cli.Commands.Enums.Commands>command, args).run();
}
