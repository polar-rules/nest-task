import "reflect-metadata";

import { Patches } from "@patches/index.js";

import { _Enums } from "./decorators.enums.js";

export function _Property(): PropertyDecorator {
    return (target: object, propertyKey: string | symbol): void => {
        const metadata = Patches.Reflect.getMetadata<(string | symbol)[] | undefined>(
            _Enums.Metadata.Dto.Property,
            target.constructor,
        );
        const value = metadata ?? [];

        value.push(propertyKey);

        Reflect.defineMetadata(_Enums.Metadata.Dto.Property, value, target.constructor);
    };
}
