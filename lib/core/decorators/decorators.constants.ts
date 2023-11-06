import { _Types } from "./decorators.types.js";

export namespace _Constants {
    export namespace Descriptable {
        export const metadataKeys: Readonly<_Types.DescriptableKeys[]> = ["name", "description"];
    }

    export namespace Task {
        export const watermark: Readonly<string> = "__task__";

        export const metadataKeys: Readonly<_Types.Task.MetadataKeys[]> = ["module", "runner", "providers"];

        export const optionalMetadataKeys: Readonly<Partial<_Types.Task.MetadataKeys[]>> = ["providers"];
    }

    export namespace Module {
        export const watermark: Readonly<string> = "__module__";

        export const metadataKeys: Readonly<_Types.Module.MetadataKeys[]> = ["tasks"];
    }

    export namespace Runner {
        export const watermark: Readonly<string> = "__runner__";
    }
}
