import { Core } from "@core/index.js";
import { Errors } from "@errors/index.js";
import { Interfaces } from "@interfaces/index.js";
import { Messages } from "@messages/index.js";

/**
 * Represents a class for setting up project.
 *
 * @class _Setup
 */
export class _Setup {
    /**
     * Creates an instance of _Setup.
     *
     * @param {string | undefined} projectName - The name of the project.
     * @param {Core.ProjectConfiguration.Abstractions.Enums.Conventions} convention - The project naming convention.
     */
    public constructor(
        private readonly projectName: string | undefined,
        private readonly convention: Core.ProjectConfiguration.Abstractions.Enums.Conventions,
    ) {}

    /**
     * Runs the setup process for project configurations.
     *
     * @returns {Promise<void>} A Promise that resolves when the setup is complete.
     */
    public async run(): Promise<void> {
        try {
            await new Core.ProjectConfiguration.Setup(this.convention, this.projectName).run();

            Messages.SetupComplete({ space: true });
            Messages.Files.Updated(["<root>/nest-cli.json"]);

            const read = new Core.ProjectConfiguration.Read(this.projectName);
            await read.run();

            if (!read.resolveConfiguration.task) {
                throw new Core.ProjectConfiguration.Errors.TaskIsMissing();
            }

            const naming = new Core.ProjectConfiguration.Naming(this.convention);

            const entrypoint = new Core.ProjectConfiguration.Entrypoint(read.resolveConfiguration.task);
            const module = new Core.ProjectConfiguration.Module(read.resolveConfiguration.task);
            const task = new Core.ProjectConfiguration.Task(read.resolveConfiguration.task);
            const runner = new Core.ProjectConfiguration.Runner(read.resolveConfiguration.task);

            const files = [entrypoint.path, module.path, task.path, runner.path];

            if (naming.isBearHugs) {
                const index = new Core.ProjectConfiguration.Index(read.resolveConfiguration.task);

                files.push(index.path);
            }

            Messages.Files.Created(files);
        } catch (e: unknown) {
            if (Interfaces.InstanceOf<Errors.Base>(e, "custom")) {
                Messages.Errors.Prettify(e);
                process.exit(1);
            }

            Messages.Errors.Unhandled(e);
        }
    }
}
