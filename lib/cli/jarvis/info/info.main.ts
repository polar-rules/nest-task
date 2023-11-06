import * as chalk from "chalk";

import { Core } from "@core/index.js";
import { Prompts } from "@prompts/index.js";
import { Patches } from "@patches/index.js";

export class _Main {
    private readonly projectName: Prompts.ProjectName;

    public constructor() {
        Core.ArgumentsManager.runType = Core.Enums.RunTypes.Info;

        this.projectName = new Prompts.ProjectName();
    }

    public async run(): Promise<void> {
        await this.projectName.run();

        const loader = new Core.Loader(this.projectName.results);

        await loader.run();

        if (!Core.State.tasksList.length) {
            console.error(chalk.default.red("No tasks found"));
            return;
        }

        console.info("We found the followings tasks:");

        for (const task of Core.State.tasksList) {
            const taskName = Patches.Reflect.getMetadata<string>("name", task);
            const taskDescription = Patches.Reflect.getMetadata<string>("description", task);

            console.info(chalk.default.grey("-"), chalk.default.white(taskName));
            console.info(chalk.default.grey(`  ${taskDescription}`));
        }
    }
}
