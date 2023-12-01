/**
 * Module for executing command-line tasks.
 *
 * @module _Runner
 */

import { Cli } from "@cli/index.js";

/**
 * Executes a sequence of code generation in purpose to generate index.ts files for whole project, including
 * directories "lib" and 'specs'.
 * This function sets up a code generation assembler, configures it, generates code for specified directories,
 * and finishes the process.
 *
 * @function
 * @async
 * @returns {Promise<void>} A Promise that resolves once the code generation tasks are complete.
 */
export async function _Runner(): Promise<void> {
    try {
        const main = new Cli.Dev.Generate.Assembler.Main();

        main.configure();

        await main.generate(Cli.Dev.Generate.Assembler.Constants.Directories.Paths.lib);
        await main.generate(Cli.Dev.Generate.Assembler.Constants.Directories.Paths.specs);

        main.finish();

        process.exit(0);
    } catch (e: unknown) {
        console.error(e);
        process.exit(1);
    }
}
