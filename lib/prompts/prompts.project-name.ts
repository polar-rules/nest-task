import * as inquirer from "inquirer";

import { Patches } from "@patches/index.js";
import { Core } from "@core/index.js";

import { _Types } from "./prompts.types.js";

export class _ProjectName {
    public results: string | undefined;

    public constructor() {}

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
