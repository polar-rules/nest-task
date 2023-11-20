import { _Enums } from "./decorators.enums.js";

export function _Runner(): ClassDecorator {
    return (target: any): void => {
        Reflect.getMetadata(_Enums.Metadata.BuildIn.ParamTypes, target);
        Reflect.defineMetadata(_Enums.Metadata.Watermarks.Runner, true, target);
    };
}
