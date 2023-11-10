import { Core } from "@core/index.js";

export class _Run {
    public constructor(
        private readonly taskName: string,
        private readonly projectName: string | undefined,
    ) {}

    public async run(): Promise<void> {
        Core.ArgumentsManager.taskName = this.taskName;

        await new Core.Loader(this.projectName).run();
    }
}
