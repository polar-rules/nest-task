import { _Core } from "@cli/core/index.js";

/**
 * Main class for handling the help CLI command
 *
 * @class _Main
 */
export class _Main {
    /**
     * Creates an instance of _Main.
     *
     * @constructor
     */
    public constructor() {}

    /**
     * Runs the main process for prompting the help.
     *
     * @public
     * @async
     * @returns {Promise<void>} A promise that resolves when the operation is complete.
     */
    public async run(): Promise<void> {
        await new _Core.Help().run();
    }
}
