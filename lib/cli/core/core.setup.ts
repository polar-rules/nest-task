import { Core } from "@core/index.js";
import { Errors } from "@errors/index.js";
import { Interfaces } from "@interfaces/index.js";
import { Messages } from "@messages/index.js";

export class _Setup {
    public constructor(
        private readonly projectName: string | undefined,
        private readonly convention: Core.ProjectConfiguration.Abstractions.Enums.Conventions,
    ) {}

    public async run(): Promise<void> {
        try {
            await new Core.ProjectConfiguration.Setup(this.convention, this.projectName).run();

            Messages.SetupComplete({ space: true });
            Messages.Files.Updated(["<root>/nest-cli.json"]);

            const read = new Core.ProjectConfiguration.Read(this.projectName);
            await read.run();

            if (!read.resolveConfiguration.task) {
                return;
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
            }

            Messages.Errors.Unhandled(e);
        }
    }
}
