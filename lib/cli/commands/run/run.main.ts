import { Core } from "@core/index.js";
import { _Core } from "@cli/core/index.js";

/**
 * Main class for handling the execution of a task.
 *
 * @class _Main
 */
export class _Main {
    /**
     * Creates an instance of _Main.
     *
     * @constructor
     * @param {string} taskName - The name of the task to run.
     * @param {string | undefined} projectName - The name of the project (optional).
     * @param {Record<string, string | number>} otherArguments - Additional arguments for the task.
     */
    public constructor(
        private readonly taskName: string,
        private readonly projectName: string | undefined,
        private readonly otherArguments: Record<string, string | number>,
    ) {
        Core.ArgumentsManager.runType = Core.Enums.RunTypes.Run;
    }

    /**
     * Runs the main process for executing the task.
     *
     * @public
     * @async
     * @returns {Promise<void>} A Promise that resolves once the task execution is complete.
     */
    public async run(): Promise<void> {
        await new _Core.Run(this.taskName, this.projectName, this.otherArguments).run();
    }
}
