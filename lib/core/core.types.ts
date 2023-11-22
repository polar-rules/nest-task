import { INestApplication } from "@nestjs/common";

import { Interfaces } from "@interfaces/index.js";

export namespace _Types {
    export namespace Perform {
        export type ResolveDependencies = (dependency: Interfaces.General.AnyClass, index: number) => any | undefined;

        export type Argument = string | number | boolean | undefined | null | INestApplication;
    }
}
