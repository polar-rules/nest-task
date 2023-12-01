import { _Core } from "@cli/core/index.js";

/**
 * Main class for handling the creation of a task
 *
 * @class _Main
 */
export class _Main {
    /**
     * Creates an instance of _Main.
     *
     * @constructor
     * @param {string} moduleName - The name of the task.
     * @param {string} moduleDescription - The description of the task.
     * @param {string} [projectName] - The name of the project (optional).
     */
    public constructor(
        private readonly moduleName: string,
        private readonly moduleDescription: string,
        private readonly projectName?: string,
    ) {}

    /**
     * Runs the main process for creating the task.
     *
     * @public
     * @async
     * @returns {Promise<void>} A Promise that resolves once the task creation process is complete.
     */
    public async run(): Promise<void> {
        await new _Core.Create(this.moduleName, this.moduleDescription, this.projectName).run();
    }
}
