import path from "path";

import { Tools } from "@tools/index.js";

import { _Errors } from "./errors/index.js";
import { _Abstractions } from "./abstractions/index.js";
import { _Constants } from "./project-configuration.constants.js";

export class _Module extends _Abstractions.FileResolver {
    public get path(): string {
        if (!this.task) {
            throw new _Errors.TaskIsMissing();
        }

        return path.join(this.directory, _Constants.Setup.modulePath);
    }

    public get directory(): string {
        if (!this.task) {
            throw new _Errors.TaskIsMissing();
        }

        return Tools.PathManager.Main.instance.pathResolver(this.task.path);
    }
}
