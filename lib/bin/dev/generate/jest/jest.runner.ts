/**
 * Module for executing command-line tasks.
 *
 * @module _Runner
 */

import { Messages } from "@messages/index.js";

import { _Config } from "./config/index.js";
import { _Enums } from "./jest.enums.js";

/**
 * Executes command-line tasks based on the provided command for Jest configuration.
 * This function processes command-line arguments, extracts the command, and runs the corresponding task.
 *
 * @function
 * @async
 * @returns {Promise<void>} A Promise that resolves once the command-line task is complete.
 */
export async function _Runner(): Promise<void> {
    const command = process.argv.at(4);

    if (!command) {
        Messages.Dev.Errors.Missing.Command("third");
        process.exit(1);
    }

    switch (command) {
        case _Enums.Commands.Config:
            await _Config.Runner();
            break;
    }
}
