import path from "path";

import { _Abstractions } from "./abstractions/index.js";

/**
 * Represents the runner file generator for a task.
 *
 * @class _Runner
 * @extends {_Abstractions.FileResolver}
 */
export class _Runner extends _Abstractions.FileResolver {
    /**
     * Gets the path to the runner file.
     *
     * @type {string}
     * @public
     */
    public get path(): string {
        return path.join(this.directory, `${this.folderName}.runner.ts`);
    }
}
