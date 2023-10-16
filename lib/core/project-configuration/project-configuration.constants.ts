import { _Types } from "./project-configuration.types.js";

export namespace _Constants {
    export const configurationFile: Readonly<string> = "nest-cli.json";

    export const defaultConfig: Readonly<_Types.ApproximateConfiguration> = {
        projects: {
            default: {
                type: "application",
                root: "src",
                entryFile: "main",
                sourceRoot: "src",
            },
        },
    };
}
