import "reflect-metadata";

import { Patches } from "@patches/index.js";
import { Interfaces } from "@interfaces/index.js";

import { _Enums } from "./decorators.enums.js";

export function _Arguments(): ParameterDecorator {
    return (target: object, propertyKey: string | symbol | undefined, parameterIndex: number): void => {
        if (!propertyKey) {
            return;
        }

        const paramTypes =
            Patches.Reflect.getMetadata<Interfaces.General.AnyClass[]>(
                _Enums.Metadata.BuildIn.ParamTypes,
                target,
                propertyKey,
            ) ?? [];
        const typeOfArgument = paramTypes.at(parameterIndex);

        if (!typeOfArgument) {
            return;
        }

        Reflect.defineMetadata(_Enums.Metadata.Runner.Dto, typeOfArgument, target.constructor);
        Reflect.defineMetadata(_Enums.Metadata.Runner.DtoIndex, parameterIndex, target.constructor);
    };
}
