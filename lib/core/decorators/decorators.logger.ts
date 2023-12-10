import { _Enums } from "./decorators.enums.js";

/**
 * Decorator function for marking a parameter with Nest.js application instance. It allows you to use application
 * instance within task.
 *
 * Example: Example: public async perform(@Decorators.App() app: INestApplication)
 *
 * @function _App
 * @returns {ParameterDecorator} A decorator function.
 */
export function _Logger(): ParameterDecorator {
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

        Reflect.defineMetadata(_Enums.Metadata.Runner.LoggerIndex, parameterIndex, target.constructor);
    };
}
