import { Core } from "@core/index.js";
import { Interfaces } from "@interfaces/index.js";
import { Errors } from "@errors/index.js";
import { Messages } from "@messages/index.js";

export class _Run {
    public constructor(
        private readonly taskName: string,
        private readonly projectName: string | undefined,
        private readonly otherArguments?: Record<string, string | number>,
    ) {}

    public async run(): Promise<void> {
        try {
            Core.ArgumentsManager.taskName = this.taskName;
            Core.ArgumentsManager.taskArguments = Object.keys(this.otherArguments ?? {}).length
                ? this.otherArguments
                : undefined;

            await new Core.Loader(this.projectName).run();
        } catch (e: unknown) {
            if (Interfaces.InstanceOf<Errors.Base>(e, "custom")) {
                Messages.Errors.Prettify(e);
            }

            Messages.Errors.Unhandled(e);
        }
    }
}
