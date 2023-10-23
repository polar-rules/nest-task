// todo fix this shite
import { Interfaces } from "../interfaces/index.js";

import { _Errors } from "./errors/index.js";

export namespace _Validators {
    export namespace Main {
        export function validateDependencies(
            dependencies: (Interfaces.General.AnyClass<any, any> | undefined)[],
        ): void | never {
            if (dependencies.length === 0) {
                return;
            }

            const undefinedIndex = dependencies.findIndex(
                (dependency: Interfaces.General.AnyClass<any, any> | undefined) => typeof dependency === "undefined",
            );

            if (undefinedIndex === -1) {
                return;
            }

            throw new _Errors.CannotResolveDependencies(undefinedIndex);
        }
    }
}
