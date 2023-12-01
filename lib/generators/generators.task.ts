import path from "path";

import { _Abstractions } from "./abstractions/index.js";

/**
 * Represents the task file generator.
 *
 * @class _Task
 * @extends {_Abstractions.FileResolver}
 */
export class _Task extends _Abstractions.FileResolver {
    /**
     * Gets the path to the task file.
     *
     * @type {string}
     * @public
     */
    public get path(): string {
        return path.join(this.directory, `${this.folderName}.task.ts`);
    }
}
