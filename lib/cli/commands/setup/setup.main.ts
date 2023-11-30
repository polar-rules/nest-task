import { Core } from "@core/index.js";
import { _Core } from "@cli/core/index.js";

/**
 * Main class for handling the setup of a project.
 *
 * @class _Main
 */
export class _Main {
    /**
     * Creates an instance of _Main.
     *
     * @constructor
     * @param {string | undefined} projectName - The name of the project (optional).
     * @param {Core.ProjectConfiguration.Abstractions.Enums.Conventions} convention - The naming convention.
     */
    public constructor(
        private readonly projectName: string | undefined,
        private readonly convention: Core.ProjectConfiguration.Abstractions.Enums.Conventions,
    ) {}

    /**
     * Runs the main process for setting up the project.
     *
     * @public
     * @async
     * @returns {Promise<void>} A Promise that resolves once the project setup process is complete.
     */
    public async run(): Promise<void> {
        await new _Core.Setup(this.projectName, this.convention).run();
    }
}
