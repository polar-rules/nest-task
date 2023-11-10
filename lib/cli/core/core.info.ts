import * as chalk from "chalk";

import { Core } from "@core/index.js";
import { Patches } from "@patches/index.js";

export class _Info {
    public constructor(private readonly projectName: string | undefined) {}

    public async run(): Promise<void> {
        const loader = new Core.Loader(this.projectName);

        await loader.run();
        if (!Core.State.tasksList.length) {
            console.error(chalk.default.red("No tasks found"));
            return;
        }

        console.info("We found the followings tasks:");

        for (const task of Core.State.tasksList) {
            const taskName = Patches.Reflect.getMetadata<string>(
                Core.Decorators.Enums.Metadata.Descriptable.Name,
                task,
            );
            const taskDescription = Patches.Reflect.getMetadata<string>(
                Core.Decorators.Enums.Metadata.Descriptable.Description,
                task,
            );

            console.info(chalk.default.grey("-"), chalk.default.white(taskName));
            console.info(chalk.default.grey(`  ${taskDescription}`));
        }
    }
}
