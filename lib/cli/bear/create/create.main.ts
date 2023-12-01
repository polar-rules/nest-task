import * as inquirer from "inquirer";

import { Prompts } from "@prompts/index.js";

import { _Core } from "@cli/core/index.js";

import { _Types } from "./create.types.js";

/**
 * Main class for handling command-line interaction and initiating the creation of a task.
 *
 * @class _Main
 */
export class _Main {
    /**
     * Prompts for the project name.
     *
     * @private
     * @type {Prompts.ProjectName}
     */
    private readonly projectName: Prompts.ProjectName;

    /**
     * Creates an instance of _Main.
     *
     * @constructor
     */
    public constructor() {
        this.projectName = new Prompts.ProjectName();
    }

    /**
     * Runs the main process, prompting for inputs and initiating task creation.
     *
     * @public
     * @async
     * @returns {Promise<void>} A Promise that resolves once the task creation is complete.
     */
    public async run(): Promise<void> {
        await this.projectName.run();

        const { moduleName, moduleDescription } = await this.promptModuleNameAndDescription();

        await new _Core.Create(moduleName, moduleDescription, this.projectName.results).run();
    }

    /**
     * Prompts the user for the module name and description.
     *
     * @private
     * @async
     * @returns {Promise<_Types.Prompt>} A Promise that resolves with the user's input for module name and description.
     */
    private async promptModuleNameAndDescription(): Promise<_Types.Prompt> {
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
