/**
 * Module for executing command-line tasks.
 *
 * @module _Runner
 */

import "reflect-metadata";

import { Libraries } from "@lib/lib.libraries.js";
import { Messages } from "@messages/index.js";

import { _Command } from "./command/index.js";
import { _Bear } from "./bear/index.js";
import { _Enums } from "./bin.enums.js";

/**
 * Executes the appropriate command based on the provided command-line argument.
 *
 * @function
 * @async
 * @returns {Promise<void>} A Promise that resolves once the command execution is complete.
 */
export async function _Runner(): Promise<void> {
    const command = process.argv.at(2);

    if (!command) {
        Messages.Errors.Missing.Command();
        process.exit(1);
    }

    await Libraries.initialise();

    switch (command) {
        case _Enums.Commands.Bear:
            await _Bear.Runner();
            break;
        default:
            await _Command.Runner();
            break;
    }
}
