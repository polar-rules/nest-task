import * as chalk from "chalk";

import { Core } from "@core/index.js";

export class _Setup {
    public constructor(
        private readonly projectName: string | undefined,
        private readonly convention: Core.ProjectConfiguration.Abstractions.Enums.Conventions,
    ) {}

    public async run(): Promise<void> {
        await new Core.ProjectConfiguration.Setup(this.convention, this.projectName).run();

        console.info(chalk.default.green("Your projects setup is completed!"));
        console.info();
        console.info("We updated the following files:");
        console.info(chalk.default.gray("- <root>/nest-cli.json"));

        const read = new Core.ProjectConfiguration.Read(this.projectName);
        await read.run();

        if (!read.resolveConfiguration.task) {
            return;
        }

        const naming = new Core.ProjectConfiguration.Naming(this.convention);

        const entrypoint = new Core.ProjectConfiguration.Entrypoint(read.resolveConfiguration.task);
        const module = new Core.ProjectConfiguration.Module(read.resolveConfiguration.task);
        const task = new Core.ProjectConfiguration.Task(read.resolveConfiguration.task);
        const runner = new Core.ProjectConfiguration.Runner(read.resolveConfiguration.task);

        console.info("The following files was created:");
        console.info(chalk.default.gray(`- ${entrypoint.path}`));
        console.info(chalk.default.gray(`- ${module.path}`));
        console.info(chalk.default.gray(`- ${task.path}`));
        console.info(chalk.default.gray(`- ${runner.path}`));

        if (naming.isBearHugs) {
            const index = new Core.ProjectConfiguration.Index(read.resolveConfiguration.task);
            console.info(chalk.default.gray(`- ${index.path}`));
        }
    }
}
