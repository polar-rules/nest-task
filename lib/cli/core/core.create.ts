import path from "path";

import { Core } from "@core/index.js";
import { Generators } from "@generators/index.js";
import { Messages } from "@messages/index.js";
import { Interfaces } from "@interfaces/index.js";
import { Errors } from "@errors/index.js";

export class _Create {
    public constructor(
        private readonly moduleName: string,
        private readonly moduleDescription: string,
        private readonly projectName?: string,
    ) {}

    public async run(): Promise<void> {
        try {
            const read = new Core.ProjectConfiguration.Read(this.projectName);

            await read.run();

            if (!read.resolveConfiguration.task) {
                return;
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
            }

            Messages.Errors.Unhandled(e);
        }
    }
}
