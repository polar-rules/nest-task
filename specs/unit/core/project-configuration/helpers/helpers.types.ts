import { Core } from "@core/index.js";

export namespace _Types {
    export namespace Main {
        export interface Prepare {
            subject: Core.ProjectConfiguration.Main;
            read: Core.ProjectConfiguration.Read;
            config: Core.ProjectConfiguration.Types.Configuration.Approximate;
        }
    }

    export namespace Setup {
        export interface Prepare {
            read: Core.ProjectConfiguration.Read;
            subject: Core.ProjectConfiguration.Setup;
            defaultConfig: Core.ProjectConfiguration.Types.Configuration.Approximate;
            templatePath: string;
        }
    }
}
