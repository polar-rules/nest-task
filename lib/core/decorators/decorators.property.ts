import { Interfaces } from "@interfaces/index.js";
import { Patches } from "@patches/index.js";

import { _Types } from "./decorators.types.js";
import { _Enums } from "./decorators.enums.js";

export function _Property(): PropertyDecorator {
    return (target: object, propertyKey: string | symbol): void => {
        const type = Patches.Reflect.getMetadata<Interfaces.Reflect.DesignType>(
            _Enums.Metadata.BuildIn.DesignType,
            target,
            propertyKey,
        );
        const metadata = Patches.Reflect.getMetadata<_Types.Property.Property[] | undefined>(
            _Enums.Metadata.Dto.Property,
            target.constructor,
        );
        const value = metadata ?? [];

        value.push({ name: String(propertyKey), type: <_Types.Property.Types>type.name });

        Reflect.defineMetadata(_Enums.Metadata.Dto.Property, value, target.constructor);
    };
}
