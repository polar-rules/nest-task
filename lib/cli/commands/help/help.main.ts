import { _Core } from "@cli/core/index.js";

export class _Main {
    public constructor() {}

    public async run(): Promise<void> {
        await new _Core.Help().run();
    }
}
