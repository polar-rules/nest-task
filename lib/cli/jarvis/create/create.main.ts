import * as chalk from "chalk";
import * as inquirer from "inquirer";

import { Prompts } from "@prompts/index.js";

import { _Core } from "@cli/core/index.js";

import { _Types } from "./create.types.js";

export class _Main {
    private readonly projectName: Prompts.ProjectName;

    public constructor() {
        this.projectName = new Prompts.ProjectName();
    }

    public async run(): Promise<void> {
        await this.projectName.run();

        const { moduleName, moduleDescription } = await this.promptModuleNameAndDescription();

        await new _Core.Create(moduleName, moduleDescription, this.projectName.results).run();
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
