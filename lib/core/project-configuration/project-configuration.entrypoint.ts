import path from "path";

import { Tools } from "@tools/index.js";

import { _Abstractions } from "./abstractions/index.js";
import { _Errors } from "./errors/index.js";

export class _Entrypoint extends _Abstractions.FileResolver {
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
