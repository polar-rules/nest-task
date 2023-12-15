import { Interfaces } from "@interfaces/index.js";
import { Patches } from "@patches/index.js";

import { _Types } from "./decorators.types.js";
import { _Enums } from "./decorators.enums.js";

/**
 * Decorator function for marking a property with metadata related to DTO (Data Transfer Object). It will help as to
 * link DTO to actual arguments that are coming from CLI, provide you full information about what type of arguments
 * are expected in the task, and correctly validate them.
 *
 * Example in some DTO: @Decorators.Property() userId: string;
 *
 * @function _Property
 * @returns {PropertyDecorator} A decorator function.
 */
export function _Property(): PropertyDecorator {
    /**
     * Decorator function applied to a class property.
     *
     * @param {object} target - The target object (class).
     * @param {string | symbol} propertyKey - The property key or symbol.
     * @returns {void}
     */
    return (target: object, propertyKey: string | symbol): void => {
        const metadataType = Patches.Reflect.getMetadata<Interfaces.Reflect.DesignType>(
            _Enums.Metadata.BuildIn.DesignType,
            target,
            propertyKey,
        );
        const metadata = Patches.Reflect.getMetadata<_Types.Property.Property[] | undefined>(
            _Enums.Metadata.Dto.Property,
            target.constructor,
        );
        const value = metadata ?? [];
        const name = String(propertyKey);
        const type = new Patches.String(metadataType.name);

        value.push({ name, type: <_Types.Property.Types>type.toLowerCase() });

        Reflect.defineMetadata(_Enums.Metadata.Dto.Property, value, target.constructor);
    };
}
