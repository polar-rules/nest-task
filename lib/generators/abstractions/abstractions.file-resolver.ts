import * as path from "path";

import { Tools } from "@tools/index.js";

/**
 * Abstract class for resolving file-related paths.
 *
 * @abstract
 * @class _FileResolver
 */
export abstract class _FileResolver {
    /**
     * Creates an instance of _FileResolver.
     *
     * @param {string} folderName - The name of the folder associated with the file.
     * @param {string} taskPath - The path of the task.
     */
    public constructor(
        protected readonly folderName: string,
        private readonly taskPath: string,
    ) {}

    /**
     * Gets the directory path based on the task path and folder name.
     *
     * @readonly
     * @member {string} directory - The resolved directory path.
     */
    public get directory(): string {
        return Tools.PathManager.Main.instance.pathResolver(path.join(this.taskPath, this.folderName));
    }
}
