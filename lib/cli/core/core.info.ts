import { Core } from "@core/index.js";
import { Messages } from "@messages/index.js";
import { Interfaces } from "@interfaces/index.js";
import { Errors } from "@errors/index.js";

import { _Types } from "./core.types.js";

/**
 * Represents information about the application.
 *
 * @class _Info
 */
export class _Info {
    /**
     * Creates an instance of _Info.
     *
     * @param {string | undefined} projectName - The name of the project.
     */
    public constructor(private readonly projectName: string | undefined) {}

    /**
     * Runs the application and performs necessary tasks.
     *
     * @returns {Promise<void>} A Promise that resolves when the tasks are completed.
     */
    public async run(): Promise<void> {
        try {
            const loader = new Core.Loader(this.projectName);

            await loader.run();

            if (!Core.State.tasksList.length) {
                Messages.Errors.NoTasksIsFound();
                process.exit(1);
            }

            const tasks = Core.State.tasksList.map<Messages.Types.FoundTasks.Options>(this.processTasks());

            Messages.FoundTasks(tasks);
        } catch (e: unknown) {
            if (Interfaces.InstanceOf<Errors.Base>(e, "custom")) {
                Messages.Errors.Prettify(e);
                process.exit(1);
            }

            Messages.Errors.Unhandled(e);
        }
    }

    /**
     * Processes tasks and converts them into a specific format.
     *
     * @returns {_Types.Info.ProcessTasks} A function that processes tasks.
     */
    private processTasks(): _Types.Info.ProcessTasks {
        return function (task: Core.Task): Messages.Types.FoundTasks.Options {
            return {
                [Core.Decorators.Enums.Metadata.Descriptable.Name]: task.deprecated
                    ? `[Deprecated] ${task.name}`
                    : task.name,
                [Core.Decorators.Enums.Metadata.Descriptable.Description]: task.description,
                args: task.args,
            };
        };
    }
}
