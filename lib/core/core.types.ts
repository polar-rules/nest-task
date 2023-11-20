import { INestApplication } from "@nestjs/common";
import { TypeMetadata } from "class-transformer/cjs/storage.js";

import { Interfaces } from "@interfaces/index.js";

export namespace _Types {
    export namespace Perform {
        export type ResolveDependencies = (dependency: Interfaces.General.AnyClass, index: number) => any | undefined;

        export type Argument = string | number | boolean | undefined | null | INestApplication;
    }

    export namespace Task {
        export interface Argument {
            name: string;
            type: string;
            metadata: TypeMetadata;
        }
    }
}
