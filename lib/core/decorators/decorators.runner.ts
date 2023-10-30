import "reflect-metadata";

import { Patches } from "@patches/index.js";

import { _Types } from "./decorators.types.js";
import { _Constants } from "./decorators.constants.js";
import { _Validators } from "./decorators.validators.js";

export function _Runner(metadata: _Types.Descriptable): ClassDecorator {
    return (target: any): void => {
        const propsKeys = Patches.Object.typeSafeKeys<_Types.Descriptable>(metadata);

        _Validators.Descriptable.keys(propsKeys);

        Reflect.getMetadata("design:paramtypes", target);
        Reflect.defineMetadata(_Constants.Runner.watermark, true, target);

        for (const property in metadata) {
            if (metadata.hasOwnProperty(property)) {
                Reflect.defineMetadata(property, (<any>metadata)[property], target);
            }
        }
    };
}
