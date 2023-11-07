import { _Types } from "./decorators.types.js";
import { _Enums } from "./decorators.enums.js";

export namespace _Constants {
    export namespace Descriptable {
        export const metadataKeys: Readonly<_Types.DescriptableKeys[]> = [
            _Enums.Metadata.Descriptable.Name,
            _Enums.Metadata.Descriptable.Description,
        ];
    }

    export namespace Task {
        export const metadataKeys: Readonly<_Types.Task.MetadataKeys[]> = [
            _Enums.Metadata.Task.Module,
            _Enums.Metadata.Task.Runner,
            _Enums.Metadata.Task.Providers,
        ];

        export const optionalMetadataKeys: Readonly<Partial<_Types.Task.MetadataKeys[]>> = [
            _Enums.Metadata.Task.Providers,
        ];
    }

    export namespace Module {
        export const metadataKeys: Readonly<_Types.Module.MetadataKeys[]> = [_Enums.Metadata.Module.Tasks];
    }
}
