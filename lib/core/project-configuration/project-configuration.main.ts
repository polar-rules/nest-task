import * as path from "path";

import { _Errors } from "./errors/index.js";

import { _Types } from "./project-configuration.types.js";
import { _Constants } from "./project-configuration.constants.js";
import { _Read } from "./project-configuration.read.js";
import { _Entrypoint } from "./project-configuration.entrypoint.js";

/**
 * Represents the main class for project configuration handling.
 *
 * @class
 */
export class _Main {
    /**
     * Instance of the `_Read` class for reading project configuration.
     *
     * @private
     * @readonly
     */
    private readonly read: _Read;

    /**
     * Creates an instance of `_Main`.
     *
     * @constructor
     * @param {string} [projectName] - The name of the project.
     */
    public constructor(private readonly projectName?: string) {
        this.read = new _Read(this.projectName);
    }

    /**
     * Get the path to the compiled entrypoint.
     *
     * @throws {_Errors.TaskIsMissing} Throws an error if the task is missing.
     * @type {string | never}
     */
    public get entrypointPath(): string | never {
        const task = this.read.taskConfiguration;

        if (!task) {
            throw new _Errors.TaskIsMissing();
        }

        return this.compiledEntrypoint(task);
    }

    /**
     * Read and load project configuration.
     *
     * @returns {Promise<void>}
     */
    public async readAndLoad(): Promise<void> {
        await this.read.run();
    }

    /**
     * Get the compiled entrypoint path based on the task configuration.
     *
     * @private
     * @param {_Types.Task} task - The task configuration.
     * @returns {string} The compiled entrypoint path.
     */
    private compiledEntrypoint(task: _Types.Task): string {
        const sourceRoot = this.read.resolveConfiguration.sourceRoot ?? "src";
        const entrypoint = new _Entrypoint(task);

        const folder = entrypoint.directory.replace(
            sourceRoot,
            this.read.resolveConfiguration.task?.distDirectory ?? _Constants.Main.compiledFolder,
        );
        const plainFilename = path.basename(entrypoint.path, ".ts");
        const filename = [plainFilename, "js"].join(".");

        return path.join(folder, filename);
    }
}
