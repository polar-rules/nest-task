import { Patches } from "@patches/index.js";

import { _Types } from "./decorators.types.js";
import { _Enums } from "./decorators.enums.js";
import { _Validators } from "./decorators.validators.js";

/**
 * Decorator function for marking a class as a task module. This step is required to correctly mark task class.
 * @Decorators.Task expect to receive the following arguments: (name | string), (description | string),
 * (runner | @Decorators.Runner() class {}), (module | INestApplication), (providers | Array(@Injectable() class{}))
 *
 * Example: @Decorators.Task({ ... }) class ExampleTask {}
 *
 * @function _Task
 * @param { _Types.Task.Metadata} metadata - The metadata for the task.
 * @returns {ClassDecorator} A decorator function.
 */
export function _Task(metadata: _Types.Task.Metadata): ClassDecorator {
    /**
     * Decorator function applied to a class.
     *
     * @param {any} target - The target class.
     * @returns {void}
     */
    return (target: any): void => {
        const propsKeys = Patches.Object.typeSafeKeys<_Types.Task.Metadata>(metadata);

        _Validators.Descriptable.keys(propsKeys);
        _Validators.Task.keys(propsKeys);

        Reflect.defineMetadata(_Enums.Metadata.Watermarks.Task, true, target);

        for (const property in metadata) {
            if (metadata.hasOwnProperty(property)) {
                Reflect.defineMetadata(property, (<any>metadata)[property], target);
            }
        }
    };
}
