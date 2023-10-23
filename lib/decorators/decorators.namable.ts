import { _Types } from "./decorators.types.js";

export function _Namable(module: string) {
    return function (target: _Types.Namable.Target) {
        const className = target.name.substring(1);

        Object.defineProperty(target, "name", {
            value: [module, className].join("::"),
            writable: false,
        });
    };
}
