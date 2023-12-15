import { _Types } from "./decorators.types.js";
import { _Enums } from "./decorators.enums.js";

/**
 * Constants related to decorators used in the application.
 *
 * @namespace _Constants
 */
export namespace _Constants {
    /**
     * Constants related to descriptable metadata keys.
     *
     * @namespace Descriptable
     */
    export namespace Descriptable {
        /**
         * Metadata keys for descriptable properties.
         *
         * @constant {Readonly<_Types.DescriptableKeys[]>} metadataKeys
         */
        export const metadataKeys: Readonly<_Types.DescriptableKeys[]> = [
            _Enums.Metadata.Descriptable.Name,
            _Enums.Metadata.Descriptable.Description,
        ];
    }

    /**
     * Constants related to task metadata keys.
     *
     * @namespace Task
     */
    export namespace Task {
        /**
         * Metadata keys for task properties.
         *
         * @constant {Readonly<_Types.Task.MetadataKeys[]>} metadataKeys
         */
        export const metadataKeys: Readonly<_Types.Task.MetadataKeys[]> = [
            _Enums.Metadata.Task.Module,
            _Enums.Metadata.Task.Runner,
            _Enums.Metadata.Task.Providers,
        ];

        /**
         * Optional metadata keys for task properties.
         *
         * @constant {Readonly<Partial<_Types.Task.MetadataKeys[]>>} optionalMetadataKeys
         */
        export const optionalMetadataKeys: Readonly<Partial<_Types.Task.MetadataKeys[]>> = [
            _Enums.Metadata.Task.Providers,
        ];
    }

    /**
     * Constants related to module metadata keys.
     *
     * @namespace Module
     */
    export namespace Module {
        /**
         * Metadata keys for module properties.
         *
         * @constant {Readonly<_Types.Module.MetadataKeys[]>} metadataKeys
         */
        export const metadataKeys: Readonly<_Types.Module.MetadataKeys[]> = [
            _Enums.Metadata.Module.Tasks as unknown as "tasks",
        ];
    }
}
