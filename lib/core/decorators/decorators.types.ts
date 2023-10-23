import "reflect-metadata";

import { Interfaces } from "@interfaces/index.js";

export namespace _Types {
    export namespace Task {
        export interface Metadata {
            module: Interfaces.General.AnyClass<any, any>;
            runner: Interfaces.General.AnyClass<any, any>;
            providers?: Interfaces.General.AnyClass<any, any>[];
        }
    }
}
