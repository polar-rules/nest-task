import * as chalk from "chalk";

import { Core } from "@core/index.js";
import { Patches } from "@patches/index.js";

export class _Main {
    public constructor(private readonly projectName: string | undefined) {
        Core.ArgumentsManager.runType = Core.Enums.RunTypes.Info;
    }

    public async run(): Promise<void> {
        const loader = new Core.Loader(this.projectName);

        await loader.run();

        if (Core.State.tasksList.length) {
            console.error(chalk.default.red("No tasks found"));
            return;
        }

        console.info("We found the followings tasks:");

        for (const task of Core.State.tasksList) {
            const taskName = Patches.Reflect.getMetadata<string>(
                Core.Decorators.Enums.Metadata.Descriptable.Name,
                task,
            );
            console.info(chalk.default.grey(taskName));
        }
    }
}
