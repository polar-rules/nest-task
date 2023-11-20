import { _Enums } from "./decorators.enums.js";

export function _App(): ParameterDecorator {
    return (target: object, propertyKey: string | symbol | undefined, parameterIndex: number): void => {
        if (!propertyKey) {
            return;
        }

        Reflect.defineMetadata(_Enums.Metadata.Runner.AppIndex, parameterIndex, target.constructor);
    };
}
