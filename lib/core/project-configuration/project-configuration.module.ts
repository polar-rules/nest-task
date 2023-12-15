import * as path from "path";

import { Tools } from "@tools/index.js";

import { _Errors } from "./errors/index.js";
import { _Abstractions } from "./abstractions/index.js";
import { _Constants } from "./project-configuration.constants.js";

/**
 * Represents a module file resolver.
 *
 * @class
 * @extends _Abstractions.FileResolver
 */
export class _Module extends _Abstractions.FileResolver {
    /**
     * Get the path to the module file.
     *
     * @throws {_Errors.TaskIsMissing} Throws an error if the task is missing.
     * @type {string}
     */
    public get path(): string {
        if (!this.task) {
            throw new _Errors.TaskIsMissing();
        }

        return path.join(this.directory, _Constants.Setup.modulePath);
    }

    /**
     * Get the directory of the module file.
     *
     * @throws {_Errors.TaskIsMissing} Throws an error if the task is missing.
     * @type {string}
     */
    public get directory(): string {
        if (!this.task) {
            throw new _Errors.TaskIsMissing();
        }

        return Tools.PathManager.Main.instance.pathResolver(this.task.path);
    }
}
