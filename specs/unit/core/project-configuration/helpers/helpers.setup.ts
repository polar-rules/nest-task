import { Core } from "@core/index.js";
import { Tools } from "@tools/index.js";

import { _Types } from "./helpers.types.js";

export namespace _Setup {
    export namespace Root {
        export function prepare(Subject: typeof Core.ProjectConfiguration.Setup): _Types.Setup.Prepare {
            const read = new Core.ProjectConfiguration.Read();
            const subject = new Subject();
            const defaultConfig: Core.ProjectConfiguration.Types.Configuration.Approximate = {};
            const templatePath = Tools.PathManager.Main.instance.moduleTypePathResolver(
                Core.ProjectConfiguration.Constants.Templates.entrypointPath,
            );

            return {
                read,
                subject,
                defaultConfig,
                templatePath,
            };
        }
    }

    export namespace Projects {
        export function prepare(
            Subject: typeof Core.ProjectConfiguration.Setup,
            projectName: string,
        ): _Types.Setup.Prepare {
            const read = new Core.ProjectConfiguration.Read(projectName);
            const subject = new Subject(projectName);
            const templatePath = Tools.PathManager.Main.instance.moduleTypePathResolver(
                Core.ProjectConfiguration.Constants.Templates.entrypointPath,
            );
            const defaultConfig: Core.ProjectConfiguration.Types.Configuration.Approximate = {
                projects: {
                    valid: {
                        type: "application",
                        root: "src",
                        entryFile: "main",
                        sourceRoot: "src",
                    },
                },
            };

            return {
                read,
                subject,
                templatePath,
                defaultConfig,
            };
        }
    }
}
