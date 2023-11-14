import path from "path";

import { _Abstractions } from "./abstractions/index.js";

export class _Index extends _Abstractions.FileResolver {
    public get path(): string {
        return path.join(this.directory, "index.ts");
    }
}
