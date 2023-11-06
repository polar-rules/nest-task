import "reflect-metadata";

import { _Constants } from "./decorators.constants.js";

export function _Runner(): ClassDecorator {
    return (target: any): void => {
        Reflect.getMetadata("design:paramtypes", target);
        Reflect.defineMetadata(_Constants.Runner.watermark, true, target);
    };
}
