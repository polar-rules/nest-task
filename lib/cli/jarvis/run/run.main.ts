import * as inquirer from "inquirer";

import { Core } from "@core/index.js";
import { Prompts } from "@prompts/index.js";

import { _Core } from "@cli/core/index.js";

import { _Types } from "./run.types.js";

export class _Main {
    private additionalArguments: Record<string, string> = {};

    private readonly projectName: Prompts.ProjectName;

    private readonly taskName: Prompts.TaskName;

    public constructor() {
        Core.ArgumentsManager.runType = Core.Enums.RunTypes.Run;

        this.projectName = new Prompts.ProjectName();
        this.taskName = new Prompts.TaskName();
    }

    public async run(): Promise<void> {
        await this.projectName.run();
        await this.taskName.run();
        await this.promptShouldAddArguments();

        await new _Core.Run(this.taskName.results, this.projectName.results, this.additionalArguments).run();
    }

    private async promptShouldAddArguments(): Promise<void> {
        const response = await inquirer.default.prompt<_Types.AddArgument.Prompt>({
            name: "shouldAddArgument",
            message: "Do you want to add argument?",
            type: "confirm",
        });

        if (!response.shouldAddArgument) {
            return;
        }

        await this.promptAdditionalArgument();
    }

    private async promptAdditionalArgument(): Promise<void> {
        const response = await inquirer.default.prompt<_Types.AdditionalArgument.Prompt>([
            { name: "argumentKey", message: "What is argument name?", type: "input" },
            { name: "argumentValue", message: "What is argument value?", type: "input" },
        ]);

        this.additionalArguments[response.argumentKey] = response.argumentValue;

        await this.promptShouldAddArguments();
    }
}
