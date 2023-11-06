import * as chalk from "chalk";

import { Core } from "@core/index.js";

export class _Main {
    public constructor(private readonly projectName: string | undefined) {}

    public async run(): Promise<void> {
        await new Core.ProjectConfiguration.Setup(this.projectName).run();

        console.info(chalk.default.green("Your projects setup is completed!"));

        console.info("We updated the following files:");
        console.info(chalk.default.gray("- `<root>/nest-cli.json`"));

        const read = new Core.ProjectConfiguration.Read(this.projectName);
        await read.run();

        if (!read.resolveConfiguration.task) {
            return;
        }

        const entrypoint = new Core.ProjectConfiguration.Entrypoint(read.resolveConfiguration.task);
        const module = new Core.ProjectConfiguration.Module(read.resolveConfiguration.task);

        console.info("The following files was created:");
        console.info(chalk.default.gray(`- ${entrypoint.path}`));
        console.info(chalk.default.gray(`- ${module.path}`));
    }
}
