import * as inquirer from "inquirer";

import { Core } from "@core/index.js";
import { Prompts } from "@prompts/index.js";

import { _Core } from "@cli/core/index.js";

import { _Types } from "./setup.types.js";

/**
 * Main class for handling command-line interaction and initiating setup tasks.
 *
 * @class _Main
 */
export class _Main {
    /**
     * Prompts for the project name.
     *
     * @type {Prompts.ProjectName}
     * @private
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
     * Runs the main process, prompting for inputs and initiating setup tasks.
     *
     * @public
     * @async
     * @returns {Promise<void>} A Promise that resolves once the setup task is complete.
     */
    public async run(): Promise<void> {
        await this.projectName.run();

        const { naming } = await this.promptConventions();

        await new _Core.Setup(this.projectName.results, naming).run();
    }

    /**
     * Prompts the user to select naming conventions for the project.
     *
     * @private
     * @async
     * @returns {Promise<_Types.Prompt>} A Promise that resolves with the user's selected naming convention.
     */
    private async promptConventions(): Promise<_Types.Prompt> {
        return inquirer.default.prompt<_Types.Prompt>([
            {
                name: "naming",
                message: "Pick a naming convention",
                type: "list",
                choices: Object.values(Core.ProjectConfiguration.Constants.convention),
            },
        ]);
    }
}
