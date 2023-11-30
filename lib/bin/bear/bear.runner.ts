/**
 * Module for executing command-line tasks.
 *
 * @module _Runner
 */

import { Cli } from "@cli/index.js";

/**
 * Executes the command-line task for Bear assistant using the Cli module.
 *
 * This function initializes and runs the main Bear command-line interface.
 * @function
 * @async
 * @returns {Promise<void>} A Promise that resolves once the command-line task is complete.
 */
export async function _Runner(): Promise<void> {
    await new Cli.Bear.Main().run();
}
