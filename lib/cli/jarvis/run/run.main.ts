import { Core } from "@core/index.js";
import { Prompts } from "@prompts/index.js";

export class _Main {
    private readonly projectName: Prompts.ProjectName;

    private readonly taskName: Prompts.TaskName;

    public constructor() {
        Core.ArgumentsManager.runType = Core.Enums.RunTypes.Run;

        this.projectName = new Prompts.ProjectName();
        this.taskName = new Prompts.TaskName();
    }

    public async run(): Promise<void> {
        await this.projectName.run();
        await this.taskName.run();

        Core.ArgumentsManager.taskName = this.taskName.results;

        await new Core.Loader(this.projectName.results).run();
    }
}
