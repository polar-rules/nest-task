import { Core } from "@core/index.js";

export namespace _Types {
    export interface ExpectedArguments {
        projectName?: string;
        convention: Core.ProjectConfiguration.Abstractions.Enums.Conventions;
    }
}
