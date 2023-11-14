import { Core } from "@core/index.js";

export class _Run {
    public constructor(
        private readonly taskName: string,
        private readonly projectName: string | undefined,
        private readonly otherArguments?: Record<string, string | number>,
    ) {}

    public async run(): Promise<void> {
        Core.ArgumentsManager.taskName = this.taskName;
        Core.ArgumentsManager.taskArguments = Object.keys(this.otherArguments ?? {}).length
            ? this.otherArguments
            : undefined;

        await new Core.Loader(this.projectName).run();
    }
}
