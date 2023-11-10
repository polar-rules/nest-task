import { _Core } from "@cli/core/index.js";

export class _Main {
    public constructor(
        private readonly moduleName: string,
        private readonly moduleDescription: string,
        private readonly projectName?: string,
    ) {}

    public async run(): Promise<void> {
        await new _Core.Create(this.moduleName, this.moduleDescription, this.projectName).run();
    }
}
