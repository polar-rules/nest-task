import { Core } from "@core/index.js";
import { Messages } from "@messages/index.js";
import { Patches } from "@patches/index.js";
import { Interfaces } from "@interfaces/index.js";
import { Errors } from "@errors/index.js";

export class _Info {
    public constructor(private readonly projectName: string | undefined) {}

    public async run(): Promise<void> {
        try {
            const loader = new Core.Loader(this.projectName);

            await loader.run();

            if (!Core.State.tasksList.length) {
                Messages.Errors.NoTasksIsFound();
            }

            const tasks = Core.State.tasksList.map(
                (task: Interfaces.General.AnyClass<any, any>): Messages.Types.FoundTasks.Options => ({
                    [Core.Decorators.Enums.Metadata.Descriptable.Name]: Patches.Reflect.getMetadata<string>(
                        Core.Decorators.Enums.Metadata.Descriptable.Name,
                        task,
                    ),
                    [Core.Decorators.Enums.Metadata.Descriptable.Description]: Patches.Reflect.getMetadata<string>(
                        Core.Decorators.Enums.Metadata.Descriptable.Description,
                        task,
                    ),
                }),
            );

            Messages.FoundTasks(tasks);
        } catch (e: unknown) {
            if (Interfaces.InstanceOf<Errors.Base>(e, "custom")) {
                Messages.Errors.Prettify(e);
            }

            Messages.Errors.Unhandled(e);
        }
    }
}
