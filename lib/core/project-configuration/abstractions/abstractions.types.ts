import { _Enums } from "./abstractions.enums.js";

/**
 * Namespace containing types related to abstractions.
 *
 * @namespace _Types
 */
export namespace _Types {
    /**
     * Namespace containing types related to file resolvers.
     *
     * @namespace FileResolver
     */
    export namespace FileResolver {
        /**
         * Interface representing an approximate task for a file resolver.
         *
         * @interface ApproximateTask
         */
        export interface ApproximateTask {
            path: string;
            entryPoint: string;
            convention: _Enums.Conventions;
            distDirectory?: string;
        }
    }
}
