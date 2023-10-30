import "reflect-metadata";

import { Patches } from "@patches/index.js";

import { _Types } from "./decorators.types.js";
import { _Constants } from "./decorators.constants.js";
import { _Validators } from "./decorators.validators.js";

export function _Module(metadata: _Types.Module.Metadata): ClassDecorator {
    return (target: any): void => {
        const propsKeys = Patches.Object.typeSafeKeys<_Types.Module.Metadata>(metadata);

        _Validators.Module.keys(propsKeys);

        Reflect.defineMetadata(_Constants.Module.watermark, true, target);

        for (const property in metadata) {
            if (metadata.hasOwnProperty(property)) {
                Reflect.defineMetadata(property, metadata[<keyof typeof metadata>property], target);
            }
        }
    };
}
