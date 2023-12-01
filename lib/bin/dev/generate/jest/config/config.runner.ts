/**
 * Module for executing command-line tasks.
 *
 * @module _Runner
 */

import { Cli } from "@cli/index.js";

/**
 * Executes a sequence of command-line tasks for Jest configuration generation, by resolving the paths that are
 * mentioned in 'tsconfig' in purpose to apply the same aliases for 'jest'.
 * This function sets up a Jest configuration generator, configures it, generates Jest configuration,
 * and finishes the process.
 *
 * @function
 * @async
 */
export async function _Runner() {
    try {
        const main = new Cli.Dev.Generate.Jest.Config.Main();

        main.configure();
        await main.generate();
        main.finish();

        process.exit(0);
    } catch (e: unknown) {
        console.error(e);
        process.exit(1);
    }
}
