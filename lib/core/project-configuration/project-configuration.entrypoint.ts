import path from "path";

import { Tools } from "@tools/index.js";

import { _Errors } from "./errors/index.js";
import { _Types } from "./project-configuration.types.js";

export class _Entrypoint {
    public constructor(private readonly task: _Types.Task) {}

    public get path(): string {
        if (!this.task) {
            throw new _Errors.TaskIsMissing();
        }

        return path.join(this.directory, this.task.entryPoint);
    }

    public get directory(): string {
        if (!this.task) {
            throw new _Errors.TaskIsMissing();
        }

        return Tools.PathManager.Main.instance.pathResolver(this.task.path);
    }
}
