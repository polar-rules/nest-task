import { Core } from "@core/index.js";

export namespace _Types {
    export namespace FoundTasks {
        export type Options = Core.Decorators.Types.Descriptable;
    }

    export namespace Rtfm {
        export interface Options {
            before: boolean;
            after: boolean;
        }
    }

    export namespace SetupComplete {
        export interface Options {
            space: boolean;
        }
    }
}
