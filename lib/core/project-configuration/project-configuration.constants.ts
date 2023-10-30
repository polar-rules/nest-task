import * as path from "path";

import { _Types } from "./project-configuration.types.js";

export namespace _Constants {
    export const configurationFileName: Readonly<string> = "nest-cli.json";

    export namespace Setup {
        export const defaultFolderName: Readonly<string> = "tasks";

        export const defaultConfiguration: Readonly<_Types.Task> = {
            path: path.join("src", defaultFolderName),
            entryPoint: "main.ts",
        };
    }

    export namespace Templates {
        export const entrypointPath: Readonly<string> = path.join(
            "src",
            "project-configuration",
            "templates",
            "templates.entrypoint.template",
        );
    }
}
