import * as path from "path";

import { Core } from "@core/index.js";
import { Generators } from "@generators/index.js";
import { Messages } from "@messages/index.js";
import { Interfaces } from "@interfaces/index.js";
import { Errors } from "@errors/index.js";

/**
 * Class responsible for creating a new module based on user input.
 *
 * @class _Create
 */
export class _Create {
    /**
     * Creates an instance of _Create.
     *
     * @param {string} moduleName - The name of the new module.
     * @param {string} moduleDescription - The description of the new module.
     * @param {string | undefined} [projectName] - The name of the project (optional).
     */
    public constructor(
        private readonly moduleName: string,
        private readonly moduleDescription: string,
        private readonly projectName?: string,
    ) {}

    /**
     * Runs the process of creating a new module.
     *
     * @returns {Promise<void>}
     */
    public async run(): Promise<void> {
        try {
            const read = new Core.ProjectConfiguration.Read(this.projectName);

            await read.run();

            if (!read.resolveConfiguration.task) {
                throw new Core.ProjectConfiguration.Errors.TaskIsMissing();
            }

            Messages.Notes.NamingConvention({ space: true });

            const generator = new Generators.Create(
                this.moduleName,
                read.resolveConfiguration.task.convention,
                this.moduleDescription,
                read.resolveConfiguration.task.path,
            );

            await generator.run();

            Messages.Directories.Created([path.join(read.resolveConfiguration.task.path, this.moduleName)]);
            Messages.Notes.UpdateTaskModule({ space: true });
        } catch (e: unknown) {
            if (Interfaces.InstanceOf<Errors.Base>(e, "custom")) {
                Messages.Errors.Prettify(e);
                process.exit(1);
            }

            Messages.Errors.Unhandled(e);
        }
    }
}
