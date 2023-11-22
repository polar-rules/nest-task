import { Core } from "@core/index.js";

export namespace _Types {
    export namespace FoundTasks {
        export interface Options extends Core.Decorators.Types.Descriptable {
            args?: Core.Decorators.Types.Property.Property[];
        }
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
