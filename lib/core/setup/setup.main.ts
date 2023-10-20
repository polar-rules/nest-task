import * as fs from "fs/promises";

import { _ReadNestjsConfiguration as _CoreReadNestjsConfiguration } from "@core/core.read-nestjs-configuration.js";

import { _Constants } from "./setup.constants.js";

export class _Main {
    public constructor() {}

    public async write(): Promise<void> {
        const readNestjsConfiguration = new _CoreReadNestjsConfiguration();
        const parsedFile = await readNestjsConfiguration.read();

        parsedFile.task = _Constants.defaultTaskConfiguration;

        await fs.writeFile(readNestjsConfiguration.configurationPath, JSON.stringify(parsedFile));
    }
}
