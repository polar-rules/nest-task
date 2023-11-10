import { Core } from "@core/index.js";

import { _Core } from "@cli/core/index.js";

export class _Main {
    public constructor(private readonly projectName: string | undefined) {
        Core.ArgumentsManager.runType = Core.Enums.RunTypes.Info;
    }

    public async run(): Promise<void> {
        await new _Core.Info(this.projectName).run();
    }
}
