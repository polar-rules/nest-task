import { _Errors } from "./errors/index.js";
import { _Types } from "./project-configuration.types.js";
import { _Constants } from "./project-configuration.constants.js";
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

        return this.compiledEntrypoint(task);
    }

    public async readAndLoad(): Promise<void> {
        await this.read.run();
    }

    private compiledEntrypoint(task: _Types.Task): string {
        const sourceRoot = this.read.configuration.sourceRoot ?? "src";
        const entrypoint = new _Entrypoint(task);

        return entrypoint.path.replace(sourceRoot, _Constants.Main.compiledFolder).replace("ts", "js");
    }
}
