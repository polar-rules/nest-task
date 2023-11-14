import { Core } from "@core/index.js";

import { _Types } from "./helpers.types.js";

export namespace _Main {
    export function prepare(Subject: typeof Core.ProjectConfiguration.Main): _Types.Main.Prepare {
        const subject = new Subject();
        const read = new Core.ProjectConfiguration.Read();
        const config: Core.ProjectConfiguration.Types.Configuration.Approximate = {
            task: {
                entryPoint: "test.ts",
                path: "test-path",
                convention: Core.ProjectConfiguration.Abstractions.Enums.Conventions.BearHugs,
            },
        };

        return {
            subject,
            read,
            config,
        };
    }
}
