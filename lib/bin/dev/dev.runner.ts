/**
 * Module for executing command-line tasks.
 *
 * @module _Runner
 */

import { Messages } from "@messages/index.js";

import { _Generate } from "./generate/index.js";
import { _Enums } from "./dev.enums.js";

/**
 * Executes command-line dev-only tasks based on the provided command.
 * This function processes command-line arguments, extracts the command, and runs the corresponding task.
 *
 * @function
 * @async
 * @returns {Promise<void>} A Promise that resolves once the command-line task is complete.
 */
export async function _Runner(): Promise<void> {
    const command = process.argv.at(2);

    if (!command) {
        Messages.Dev.Errors.Missing.Command("first");
    }

    switch (command) {
        case _Enums.Commands.Generate:
            await _Generate.Runner();
            break;
    }
}
