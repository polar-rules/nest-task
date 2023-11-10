import { _Core } from "@cli/core/index.js";

export class _Main {
    public constructor(private readonly projectName: string | undefined) {}

    public async run(): Promise<void> {
        await new _Core.Setup(this.projectName).run();
    }
}
