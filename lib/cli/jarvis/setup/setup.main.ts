import * as inquirer from "inquirer";

import { Core } from "@core/index.js";
import { Prompts } from "@prompts/index.js";

import { _Core } from "@cli/core/index.js";
import { _Types } from "./setup.types.js";

export class _Main {
    private readonly projectName: Prompts.ProjectName;

    public constructor() {
        this.projectName = new Prompts.ProjectName();
    }

    public async run(): Promise<void> {
        await this.projectName.run();

        const { naming } = await this.promptConventions();

        await new _Core.Setup(this.projectName.results, naming).run();
    }

    private async promptConventions(): Promise<_Types.Prompt> {
        return inquirer.default.prompt<_Types.Prompt>([
            {
                name: "naming",
                message: "Pick a naming conventions",
                type: "list",
                choices: Object.values(Core.ProjectConfiguration.Constants.convention),
            },
        ]);
    }
}
