import "reflect-metadata";

import { Patches } from "@patches/index.js";

import { _Types } from "./decorators.types.js";
import { _Enums } from "./decorators.enums.js";
import { _Constants } from "./decorators.constants.js";
import { _Validators } from "./decorators.validators.js";

export function _Task(metadata: _Types.Task.Metadata): ClassDecorator {
    return (target: any): void => {
        const propsKeys = Patches.Object.typeSafeKeys<_Types.Task.Metadata>(metadata);

        _Validators.Task.validateModuleKeys(<_Enums.Task.MetadataKeys[]>propsKeys);

        Reflect.defineMetadata(_Constants.Task.watermark, true, target);

        for (const property in metadata) {
            if (metadata.hasOwnProperty(property)) {
                Reflect.defineMetadata(property, (metadata as any)[property], target);
            }
        }
    };
}
