import { Interfaces } from "@interfaces/index.js";

import { _Abstractions } from "./abstractions/index.js";

export namespace _Types {
    export namespace Perform {
        export type ResolveDependencies = (dependency: Interfaces.General.AnyClass<any, any>) => any | undefined;

        export interface PrepareMetadata {
            Runner: Interfaces.General.AnyClass<_Abstractions.Runner, any>;
            Module: Interfaces.General.AnyClass<any, any>;
            providers: Interfaces.General.AnyClass<any, any>[];
            dependencies: Interfaces.General.AnyClass<any, any>[];
        }
    }
}
