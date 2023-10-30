import "reflect-metadata";

import { Interfaces } from "@interfaces/index.js";

export namespace _Types {
    export type DescriptableKeys = keyof Descriptable;

    export interface Descriptable {
        name: string;
        description: string;
    }

    export namespace Task {
        export type MetadataKeys = keyof Metadata;

        export interface Metadata extends Descriptable {
            module: Interfaces.General.AnyClass<any, any>;
            runner: Interfaces.General.AnyClass<any, any>;
            providers?: Interfaces.General.AnyClass<any, any>[];
        }
    }

    export namespace Module {
        export type MetadataKeys = keyof Metadata;

        export interface Metadata {
            tasks: Interfaces.General.AnyClass<any, any>[];
        }
    }
}
