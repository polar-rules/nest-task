import path from "path";

import { _Abstractions } from "./abstractions/index.js";

/**
 * Represents the index file generator for a task.
 *
 * @class _Index
 * @extends {_Abstractions.FileResolver}
 */
export class _Index extends _Abstractions.FileResolver {
    /**
     * Gets the path to the index file.
     *
     * @type {string}
     * @public
     */
    public get path(): string {
        return path.join(this.directory, "index.ts");
    }
}
