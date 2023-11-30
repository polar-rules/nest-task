import { Patches } from "@patches/index.js";

import { _Types } from "./decorators.types.js";
import { _Enums } from "./decorators.enums.js";
import { _Validators } from "./decorators.validators.js";

/**
 * Decorator function for marking a class as a module with specified metadata. This class considered to be a single
 * class for project.
 * @Decorators.Modules expect to receive one argument: (task | Array(@Decorators.Task() class {})).
 *
 * Example: @Decorators.Module({ ... }) class {}
 *
 * @function _Module
 * @param { _Types.Module.Metadata} metadata - The metadata for the module.
 * @returns {ClassDecorator} A decorator function.
 */
export function _Module(metadata: _Types.Module.Metadata): ClassDecorator {
    /**
     * Decorator function applied to a class.
     *
     * @param {any} target - The target class.
     * @returns {void}
     */
    return (target: any): void => {
        const propsKeys = Patches.Object.typeSafeKeys<_Types.Module.Metadata>(metadata);

        _Validators.Module.keys(propsKeys);

        Reflect.defineMetadata(_Enums.Metadata.Watermarks.Module, true, target);

        for (const property in metadata) {
            if (metadata.hasOwnProperty(property)) {
                Reflect.defineMetadata(property, metadata[<keyof typeof metadata>property], target);
            }
        }
    };
}
