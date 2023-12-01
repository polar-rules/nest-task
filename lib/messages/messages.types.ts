import { Core } from "@core/index.js";

/**
 * Namespace containing various types used in messages module.
 *
 * @namespace _Types
 */
export namespace _Types {
    /**
     * Namespace containing options for the `FoundTasks` function.
     *
     * @namespace FoundTasks
     */
    export namespace FoundTasks {
        /**
         * Options for the `FoundTasks` function, extending `Core.Decorators.Types.Descriptable`.
         *
         * @interface Options
         * @extends {Core.Decorators.Types.Descriptable}
         */
        export interface Options extends Core.Decorators.Types.Descriptable {
            args?: Core.Decorators.Types.Property.Property[];
        }
    }

    /**
     * Namespace containing options for the `Rtfm` function.
     *
     * @namespace Rtfm
     */
    export namespace Rtfm {
        /**
         * Options for the `Rtfm` function.
         *
         * @interface Options
         */
        export interface Options {
            before: boolean;
            after: boolean;
        }
    }

    /**
     * Namespace containing options for the `SetupComplete` function.
     *
     * @namespace SetupComplete
     */
    export namespace SetupComplete {
        /**
         * Options for the `SetupComplete` function.
         *
         * @interface Options
         */
        export interface Options {
            space: boolean;
        }
    }
}
