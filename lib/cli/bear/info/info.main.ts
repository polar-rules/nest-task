import { Core } from "@core/index.js";
import { Prompts } from "@prompts/index.js";

import { _Core } from "@cli/core/index.js";

/**
 * Main class for handling command-line interaction and initiating information retrieval.
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
        Core.ArgumentsManager.runType = Core.Enums.RunTypes.Info;
        Core.ArgumentsManager.executionSource = Core.Enums.ExecutionSourceTypes.Command;

        this.projectName = new Prompts.ProjectName();
    }

    /**
     * Runs the main process, prompting for the project name and initiating information retrieval.
     *
     * @public
     * @async
     * @returns {Promise<void>} A Promise that resolves once the information retrieval is complete.
     */
    public async run(): Promise<void> {
        await this.projectName.run();
        await new _Core.Info.Start(this.projectName.results).run();
    }
}
