import "reflect-metadata";

import { Interfaces } from "@interfaces/index.js";

import { _Enums } from "./decorators.enums.js";

export namespace _Types {
    export type Descriptable = Record<_Enums.Metadata.Descriptable, string>;

    export type DescriptableKeys = keyof Descriptable;

    export namespace Task {
        export type Metadata = Descriptable & OwnProperties;

        export type MetadataKeys = keyof Metadata;

        interface OwnProperties {
            [_Enums.Metadata.Task.Module]: Interfaces.General.AnyClass;
            [_Enums.Metadata.Task.Runner]: Interfaces.General.AnyClass;
            [_Enums.Metadata.Task.Providers]?: Interfaces.General.AnyClass[];
        }
    }

    export namespace Module {
        export type Metadata = Record<_Enums.Metadata.Module, Interfaces.General.AnyClass[]>;

        export type MetadataKeys = keyof Metadata;
    }
}
