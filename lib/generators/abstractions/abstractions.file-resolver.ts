import path from "path";

import { Tools } from "@tools/index.js";

export abstract class _FileResolver {
    public constructor(
        protected readonly folderName: string,
        private readonly taskPath: string,
    ) {}

    public get directory(): string {
        return Tools.PathManager.Main.instance.pathResolver(path.join(this.taskPath, this.folderName));
    }
}
