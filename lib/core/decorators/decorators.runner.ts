import { _Enums } from "./decorators.enums.js";

/**
 * Decorator function for marking a class as a runner. This step is required to correctly map runner class.
 * @Decorators.Runner() do not expect to receive in arguments.
 *
 * Example: @Decorators.Runner() class ExampleRunner {}
 *
 * @function _Runner
 * @returns {ClassDecorator} A decorator function.
 */
export function _Runner(): ClassDecorator {
    /**
     * Decorator function applied to a class.
     *
     * @param {any} target - The target class.
     * @returns {void}
     */
    return (target: any): void => {
        Reflect.getMetadata(_Enums.Metadata.BuildIn.ParamTypes, target);
        Reflect.defineMetadata(_Enums.Metadata.Watermarks.Runner, true, target);
    };
}
