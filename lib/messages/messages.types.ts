import { Core } from "@core/index.js";

export namespace _Types {
    export namespace FoundTasks {
        export interface Argument {
            name: string;
            type: string;
        }

        export interface Options extends Core.Decorators.Types.Descriptable {
            args?: Argument[];
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
