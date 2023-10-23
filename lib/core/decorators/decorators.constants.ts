import { _Enums } from "./decorators.enums.js";

export namespace _Constants {
    export namespace Task {
        export const watermark: Readonly<string> = "__task__";

        export const metadataKeys: Readonly<_Enums.Task.MetadataKeys[]> = [
            _Enums.Task.MetadataKeys.Module,
            _Enums.Task.MetadataKeys.Runner,
            _Enums.Task.MetadataKeys.Providers,
        ];
    }

    export namespace Exec {
        export const watermark: Readonly<string> = "__exec__";
    }
}
