import { Patches } from "@patches/index.js";
import { Interfaces } from "@interfaces/index.js";

import { _Enums } from "./decorators.enums.js";

/**
 * Decorator function for marking arguments as a part of task arguments. Basically it gives you an ability
 * to name argument whatever you like and just use @Decorators.Arguments to link CLI arguments to function arguments.
 *
 * Example: public async perform(@Decorators.Arguments() myArgsName: SomeDto)
 *
 * @function _Arguments
 * @returns {ParameterDecorator} A decorator function.
 */
export function _Arguments(): ParameterDecorator {
    /**
     * Decorator function applied to a method parameter.
     *
     * @param {object} target - The target object.
     * @param {string | symbol | undefined} propertyKey - The property key or symbol.
     * @param {number} parameterIndex - The index of the parameter in the method's parameter list.
     * @returns {void}
     */
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
