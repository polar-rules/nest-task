import path from "path";

import { Tools } from "@tools/index.js";

import { _Errors } from "./errors/index.js";
import { _Abstractions } from "./abstractions/index.js";

/**
 * Represents an entrypoint file resolver.
 *
 * @class
 * @extends _Abstractions.FileResolver
 */
export class _Entrypoint extends _Abstractions.FileResolver {
    /**
     * Get the path to the entrypoint file.
     *
     * @throws {_Errors.TaskIsMissing} Throws an error if the task is missing.
     * @type {string}
     */
    public get path(): string {
        if (!this.task) {
            throw new _Errors.TaskIsMissing();
        }

        return path.join(this.directory, this.task.entryPoint);
    }

    /**
     * Get the directory of the entrypoint file.
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
