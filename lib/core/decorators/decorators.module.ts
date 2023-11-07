import "reflect-metadata";

import { Patches } from "@patches/index.js";

import { _Types } from "./decorators.types.js";
import { _Enums } from "./decorators.enums.js";
import { _Validators } from "./decorators.validators.js";

export function _Module(metadata: _Types.Module.Metadata): ClassDecorator {
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
