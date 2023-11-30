/**
 * Module for executing command-line tasks.
 *
 * @module _Runner
 */

import { Messages } from "@messages/index.js";

import { _Assembler } from "./assembler/index.js";
import { _Jest } from "./jest/index.js";
import { _Enums } from "./generate.enums.js";

/**
 * Executes command-line tasks based on the provided command for generators.
 * This function processes command-line arguments, extracts the command, and runs the corresponding task.
 *
 * @function
 * @async
 * @returns {Promise<void>} A Promise that resolves once the command-line task is complete.
 */
export async function _Runner(): Promise<void> {
    const command = process.argv.at(3);

    if (!command) {
        Messages.Dev.Errors.Missing.Command("second");
    }

    switch (command) {
        case _Enums.Commands.Assembler:
            await _Assembler.Runner();
            break;
        case _Enums.Commands.Jest:
            await _Jest.Runner();
            break;
    }
}
