import path from "path";
import fs from "fs/promises";

import { Tools } from "@tools/index.js";
import { Patches } from "@patches/index.js";

import { _Types } from "@core/core.types.js";
import { _Constants } from "@core/core.constants.js";

export class _ReadNestjsConfiguration {
    public get configurationPath(): string {
        const root = Tools.PathManager.Main.instance.projectRoot;

        return path.join(root, _Constants.configurationFile);
    }

    public async read(): Promise<_Types.ApproximateConfiguration> {
        const file = await fs.readFile(this.configurationPath);

        return Patches.Json.parse<_Types.ApproximateConfiguration>(file.toString("utf-8"));
    }
}
