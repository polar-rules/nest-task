import { Core } from "@core/index.js";

import { _Core } from "@cli/core/index.js";

export class _Main {
    public constructor(
        private readonly projectName: string | undefined,
        private readonly convention: Core.ProjectConfiguration.Abstractions.Enums.Conventions,
    ) {}

    public async run(): Promise<void> {
        await new _Core.Setup(this.projectName, this.convention).run();
    }
}
