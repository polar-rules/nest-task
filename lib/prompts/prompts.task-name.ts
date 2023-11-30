import * as inquirer from "inquirer";

import { _Types } from "./prompts.types.js";

/**
 * Class for prompting the user to input a task name.
 *
 * @class _TaskName
 */
export class _TaskName {
    /**
     * The result containing the user-inputted task name.
     *
     * @type {string}
     */
    public results!: string;

    /**
     * Creates an instance of _TaskName.
     *
     * @constructor
     */
    public constructor() {}

    /**
     * Asynchronously runs the prompt to input a task name.
     *
     * @async
     * @returns {Promise<void>}
     */
    public async run(): Promise<void> {
        const response = await inquirer.default.prompt<_Types.TaskName.Prompt>({
            name: "taskName",
            message: "What is the task name?",
            type: "input",
        });

        this.results = response.taskName;
    }
}
