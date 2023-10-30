import { Interfaces } from "@interfaces/index.js";

export namespace _Types {
    export namespace Perform {
        export type ResolveDependencies = (dependency: Interfaces.General.AnyClass<any, any>) => any | undefined;
    }
}
