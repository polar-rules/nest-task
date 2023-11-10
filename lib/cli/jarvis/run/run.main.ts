import { Core } from "@core/index.js";
import { Prompts } from "@prompts/index.js";

import { _Core } from "@cli/core/index.js";

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

        await new _Core.Run(this.taskName.results, this.projectName.results).run();
    }
}
