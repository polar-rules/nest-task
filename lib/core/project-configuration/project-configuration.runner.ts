import * as path from "path";

import { Tools } from "@tools/index.js";

import { _Errors } from "./errors/index.js";
import { _Abstractions } from "./abstractions/index.js";
import { _Constants } from "./project-configuration.constants.js";

/**
 * Represents a runner file resolver.
 *
 * @class
 * @extends _Abstractions.FileResolver
 */
export class _Runner extends _Abstractions.FileResolver {
    /**
     * Get the path to the runner file.
     *
     * @throws {_Errors.TaskIsMissing} Throws an error if the task is missing.
     * @type {string}
     */
    public get path(): string {
        if (!this.task) {
            throw new _Errors.TaskIsMissing();
        }

        return path.join(this.directory, _Constants.Setup.runnerPath);
    }

    /**
     * Get the directory of the runner file.
     *
     * @throws {_Errors.TaskIsMissing} Throws an error if the task is missing.
     * @type {string}
     */
    public get directory(): string {
        if (!this.task) {
            throw new _Errors.TaskIsMissing();
        }

        return Tools.PathManager.Main.instance.pathResolver(
            path.join(this.task.path, _Constants.Setup.exampleDirectory),
        );
    }
}
