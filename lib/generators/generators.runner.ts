import path from "path";

import { _Abstractions } from "./abstractions/index.js";

export class _Runner extends _Abstractions.FileResolver {
    public get path(): string {
        return path.join(this.directory, `${this.folderName}.runner.ts`);
    }
}
