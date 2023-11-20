import { TypeMetadata } from "class-transformer/cjs/storage.js";

import { Interfaces } from "@interfaces/index.js";

import { _Abstractions } from "./abstractions/index.js";

export namespace _Types {
    export namespace Perform {
        export type ResolveDependencies = (dependency: Interfaces.General.AnyClass, index: number) => any | undefined;

        export interface PrepareMetadata {
            Runner: Interfaces.General.AnyClass<_Abstractions.Runner>;
            Module: Interfaces.General.AnyClass;
            providers: Interfaces.General.AnyClass[];
            dependencies: Interfaces.General.AnyClass[];
        }
    }

    export namespace Task {
        export interface Argument {
            name: string;
            type: string;
            metadata: TypeMetadata;
        }
    }
}
