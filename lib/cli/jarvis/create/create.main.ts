import * as path from "path";

import * as chalk from "chalk";
import * as inquirer from "inquirer";

import { Core } from "@core/index.js";
import { Generators } from "@generators/index.js";
import { Prompts } from "@prompts/index.js";

import { _Types } from "./create.types.js";

export class _Main {
    private readonly projectName: Prompts.ProjectName;

    public constructor() {
        this.projectName = new Prompts.ProjectName();
    }

    public async run(): Promise<void> {
        await this.projectName.run();

        const read = new Core.ProjectConfiguration.Read(this.projectName.results);
        await read.run();

        if (!read.resolveConfiguration.task) {
            return;
        }

        const { moduleName, moduleDescription } = await this.promptModuleNameAndDescription();
        const generator = new Generators.Create(moduleName, read.resolveConfiguration.task.path, moduleDescription);

        await generator.run();

        console.info("We created the following directory:");
        console.info(chalk.default.gray(`- ${path.join(read.resolveConfiguration.task.path, moduleName)}`));
        console.info();
        console.info("Don't forget to update `task.module.ts` file to include new runner!");
    }

    private async promptModuleNameAndDescription(): Promise<_Types.Prompt> {
        console.info(
            chalk.default.gray(
                "Note: we will create files according to your name, eg. `exampleTask` will generate folder with same name",
            ),
        );

        return inquirer.default.prompt<_Types.Prompt>([
            {
                name: "moduleName",
                message: "What is the task name?",
                type: "input",
            },
            {
                name: "moduleDescription",
                message: "What is the task description?",
                type: "input",
            },
        ]);
    }
}
