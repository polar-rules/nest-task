import * as inquirer from "inquirer";

import { _Types } from "./prompts.types.js";

export class _TaskName {
    public results!: string;

    public constructor() {}

    public async run(): Promise<void> {
        const response = await inquirer.default.prompt<_Types.TaskName.Prompt>({
            name: "taskName",
            message: "What is task name?",
            type: "input",
        });

        this.results = response.taskName;
    }
}
