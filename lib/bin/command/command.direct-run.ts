/**
 * Module for executing command-line tasks.
 *
 * @module _DirectRun
 */

import { Cli } from "@cli/index.js";

import { _ArgumentsParser } from "./command.arguments-parser.js";

/**
 * Executes command-line tasks based on the provided arguments.
 *
 * This function processes command-line arguments, extracts key-value pairs, and runs the run command.
 * @function
 * @async
 * @returns {Promise<void>} A Promise that resolves once the command-line task is complete.
 */
export async function _DirectRun(): Promise<void> {
    await new Cli.Commands.Main(Cli.Commands.Enums.Commands.Run, new _ArgumentsParser().parse()).run();
}
