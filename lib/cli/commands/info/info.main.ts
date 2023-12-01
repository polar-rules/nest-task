import { Core } from "@core/index.js";

import { _Core } from "@cli/core/index.js";

/**
 * Main class for handling the info command
 *
 * @class _Main
 */
export class _Main {
    /**
     * Creates an instance of _Main.
     *
     * @constructor
     * @param {string} [projectName] - The name of the project (optional).
     */
    public constructor(private readonly projectName: string | undefined) {
        Core.ArgumentsManager.runType = Core.Enums.RunTypes.Info;
    }

    /**
     * Runs the main process for creating the task.
     *
     * @public
     * @async
     * @returns {Promise<void>} A Promise that resolves once the task information process is complete.
     */
    public async run(): Promise<void> {
        await new _Core.Info(this.projectName).run();
    }
}
