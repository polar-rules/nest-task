import { _Types as _CoreTypes } from "@core/core.types.js";
import { _ReadNestjsConfiguration as _CoreReadNestjsConfiguration } from "@core/core.read-nestjs-configuration.js";

import { _Constants } from "./project-configuration.constants.js";

export class _Main {
    private config: _CoreTypes.ApproximateNativeConfiguration = _Constants.defaultConfig;

    public constructor() {}

    public async readAndLoad(): Promise<void> {
        const readNestjsConfiguration = new _CoreReadNestjsConfiguration();
        const parsedFile = await readNestjsConfiguration.read();

        if (!parsedFile?.projects) {
            return;
        }

        this.config = parsedFile;
    }
}
