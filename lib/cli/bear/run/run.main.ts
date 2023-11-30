import * as inquirer from "inquirer";

import { Core } from "@core/index.js";
import { Prompts } from "@prompts/index.js";

import { _Core } from "@cli/core/index.js";

import { _Types } from "./run.types.js";

/**
 * Main class for handling command-line interaction and initiating run tasks.
 *
 * @class _Main
 */
export class _Main {
    /**
     * Additional arguments provided by the user.
     *
     * @type {Record<string, string>}
     * @private
     */
    private additionalArguments: Record<string, string> = {};

    /**
     * Prompts for the project name.
     *
     * @type {Prompts.ProjectName}
     * @private
     */
    private readonly projectName: Prompts.ProjectName;

    /**
     * Prompts for the task name.
     *
     * @type {Prompts.TaskName}
     * @private
     */
    private readonly taskName: Prompts.TaskName;

    /**
     * Creates an instance of _Main.
     *
     * @constructor
     */
    public constructor() {
        Core.ArgumentsManager.runType = Core.Enums.RunTypes.Run;

        this.projectName = new Prompts.ProjectName();
        this.taskName = new Prompts.TaskName();
    }

    /**
     * Runs the main process, prompting for inputs and initiating run tasks.
     *
     * @public
     * @async
     * @returns {Promise<void>} A Promise that resolves once the run task is complete.
     */
    public async run(): Promise<void> {
        await this.projectName.run();
        await this.taskName.run();
        await this.promptShouldAddArguments();
        await new _Core.Run(this.taskName.results, this.projectName.results, this.additionalArguments).run();
    }

    /**
     * Prompts the user to decide whether to add additional arguments.
     *
     * @private
     * @async
     * @returns {Promise<void>} A Promise that resolves once the user makes a decision.
     */
    private async promptShouldAddArguments(): Promise<void> {
        const response = await inquirer.default.prompt<_Types.AddArgument.Prompt>({
            name: "shouldAddArgument",
            message: "Do you want to add an argument?",
            type: "confirm",
        });

        if (!response.shouldAddArgument) {
            return;
        }

        await this.promptAdditionalArgument();
    }

    /**
     * Prompts the user for additional arguments and adds them to the additionalArguments property.
     *
     * @private
     * @async
     * @returns {Promise<void>} A Promise that resolves once the user completes providing additional arguments.
     */
    private async promptAdditionalArgument(): Promise<void> {
        const response = await inquirer.default.prompt<_Types.AdditionalArgument.Prompt>([
            { name: "argumentKey", message: "What is the argument name?", type: "input" },
            { name: "argumentValue", message: "What is the argument value?", type: "input" },
        ]);

        this.additionalArguments[response.argumentKey] = response.argumentValue;
        await this.promptShouldAddArguments();
    }
}
