import { Core } from "@core/index.js";
import { Interfaces } from "@interfaces/index.js";
import { Errors } from "@errors/index.js";
import { Messages } from "@messages/index.js";

/**
 * Represents a class for executing a specific task in the application.
 *
 * @class _Run
 */
export class _Run {
    /**
     * Creates an instance of _Run.
     *
     * @param {string} taskName - The name of the task to be executed.
     * @param {string | undefined} projectName - The name of the project.
     * @param {Record<string, string | number> | undefined} otherArguments - Additional arguments for the task.
     */
    public constructor(
        private readonly taskName: string,
        private readonly projectName: string | undefined,
        private readonly otherArguments?: Record<string, string | number>,
    ) {}

    /**
     * Runs the specified task along with optional arguments.
     *
     * @returns {Promise<void>} A Promise that resolves when the task is completed.
     */
    public async run(): Promise<void> {
        try {
            Core.ArgumentsManager.taskName = this.taskName;
            Core.ArgumentsManager.taskArguments = Object.keys(this.otherArguments ?? {}).length
                ? this.otherArguments
                : undefined;

            if (Core.ArgumentsManager.executionSource === Core.Enums.ExecutionSourceTypes.Direct) {
                return;
            }

            await new Core.Loader(this.projectName).run();
        } catch (e: unknown) {
            if (Interfaces.InstanceOf<Errors.Base>(e, "custom")) {
                Messages.Errors.Prettify(e);
                process.exit(1);
            }

            Messages.Errors.Unhandled(e);
        }
    }
}
