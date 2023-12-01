import * as inquirer from "inquirer";

import { Patches } from "@patches/index.js";
import { Core } from "@core/index.js";

import { _Types } from "./prompts.types.js";

/**
 * Class for prompting the user to choose a project name based on the available projects in the configuration.
 *
 * @class _ProjectName
 */
export class _ProjectName {
    /**
     * The selected project name by the user.
     *
     * @type {string | undefined}
     */
    public results: string | undefined;

    /**
     * Creates an instance of _ProjectName.
     *
     * @constructor
     */
    public constructor() {}

    /**
     * Asynchronously runs the prompt to choose a project name.
     *
     * @async
     * @returns {Promise<void>}
     */
    public async run(): Promise<void> {
        const read = new Core.ProjectConfiguration.Read();

        await read.run();

        if (!read.configuration.projects) {
            return;
        }

        const projectsKeys = Patches.Object.typeSafeKeys<
            Record<string, Core.ProjectConfiguration.Types.Configuration.ApproximateProject>
        >(read.configuration.projects);

        const response = await inquirer.default.prompt<_Types.ProjectName.Prompt>({
            name: "projectName",
            message: "Pick a project",
            type: "list",
            choices: projectsKeys,
        });

        this.results = response.projectName;
    }
}
