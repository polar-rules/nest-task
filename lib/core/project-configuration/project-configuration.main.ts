import * as fs from "fs/promises";
import * as path from "path";

import { Patches } from "@patches/index.js";
import { Tools } from "@tools/index.js";

import { _Types } from "./project-configuration.types.js";
import { _Constants } from "./project-configuration.constants.js";

export class _Main {
    private config: _Types.ApproximateConfiguration = _Constants.defaultConfig;

    public constructor() {}

    public async readAndLoad(): Promise<void> {
        const root = Tools.PathManager.Main.instance.projectRoot;
        const configFilePath = path.join(root, _Constants.configurationFile);

        const file = await fs.readFile(configFilePath);
        const parsedFile = Patches.Json.parse<_Types.ApproximateConfiguration>(file.toString("utf-8"));

        if (!parsedFile?.projects) {
            return;
        }

        this.config = parsedFile;
    }
}
