import { _Types as _CoreTypes } from "@core/core.types.js";

export namespace _Constants {
    export const defaultConfig: Readonly<_CoreTypes.ApproximateNativeConfiguration> = {
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
