import { _Errors } from "./errors/index.js";
import { _Read } from "./project-configuration.read.js";
import { _Entrypoint } from "./project-configuration.entrypoint.js";

export class _Main {
    private readonly read: _Read;

    public constructor(private readonly projectName?: string) {
        this.read = new _Read(this.projectName);
    }

    public get entrypointPath(): string | never {
        const task = this.read.taskConfiguration;

        if (!task) {
            throw new _Errors.TaskIsMissing();
        }

        const entrypoint = new _Entrypoint(task);

        return entrypoint.path;
    }

    public async readAndLoad(): Promise<void> {
        await this.read.run();
    }
}
