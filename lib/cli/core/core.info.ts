import { Core } from "@core/index.js";
import { Messages } from "@messages/index.js";
import { Interfaces } from "@interfaces/index.js";
import { Errors } from "@errors/index.js";

import { _Types } from "./core.types.js";

export class _Info {
    public constructor(private readonly projectName: string | undefined) {}

    public async run(): Promise<void> {
        try {
            const loader = new Core.Loader(this.projectName);

            await loader.run();

            if (!Core.State.tasksList.length) {
                Messages.Errors.NoTasksIsFound();
            }

            const tasks = Core.State.tasksList.map<Messages.Types.FoundTasks.Options>(this.processTasks());

            Messages.FoundTasks(tasks);
        } catch (e: unknown) {
            if (Interfaces.InstanceOf<Errors.Base>(e, "custom")) {
                Messages.Errors.Prettify(e);
            }

            Messages.Errors.Unhandled(e);
        }
    }

    private processTasks(): _Types.Info.ProcessTasks {
        return function (task: Core.Task): Messages.Types.FoundTasks.Options {
            return {
                [Core.Decorators.Enums.Metadata.Descriptable.Name]: task.name,
                [Core.Decorators.Enums.Metadata.Descriptable.Description]: task.description,
                args: task.args,
            };
        };
    }
}
