import { Prompts } from "@prompts/index.js";

import { _Core } from "@cli/core/index.js";

export class _Main {
    private readonly projectName: Prompts.ProjectName;

    public constructor() {
        this.projectName = new Prompts.ProjectName();
    }

    public async run(): Promise<void> {
        await this.projectName.run();

        await new _Core.Setup(this.projectName.results).run();
    }
}
