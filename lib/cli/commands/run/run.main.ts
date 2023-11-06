import { Core } from "@core/index.js";

export class _Main {
    public constructor(
        private readonly taskName: string,
        private readonly projectName: string | undefined,
    ) {
        Core.ArgumentsManager.runType = Core.Enums.RunTypes.Run;
    }

    public async run(): Promise<void> {
        Core.ArgumentsManager.taskName = this.taskName;

        await new Core.Loader(this.projectName).run();
    }
}
