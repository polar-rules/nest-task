/**
 * Enumerations related to decorators module
 *
 * @namespace _Enums
 */
export namespace _Enums {
    /**
     * Enumerations related to metadata used in decorators.
     *
     * @namespace Metadata
     */
    export namespace Metadata {
        /**
         * Enumerations related to built-in metadata keys.
         *
         * @namespace Metadata.BuildIn
         * @enum {string}
         */
        export enum BuildIn {
            ParamTypes = "design:paramtypes",
            DesignType = "design:type",
        }

        /**
         * Enumerations related to watermarks in metadata.
         *
         * @namespace Metadata.Watermarks
         * @enum {string}
         */
        export enum Watermarks {
            Task = "__task__",
            Module = "__module__",
            Runner = "__runner__",
        }

        /**
         * Enumerations related to descriptable metadata keys.
         *
         * @namespace Metadata.Descriptable
         * @enum {string}
         */
        export enum Descriptable {
            Name = "name",
            Description = "description",
        }

        /**
         * Enumerations related to task metadata keys.
         *
         * @namespace Metadata.Task
         * @enum {string}
         */
        export enum Task {
            Module = "module",
            Runner = "runner",
            Providers = "providers",
            Deprecated = "deprecated",
        }

        /**
         * Enumerations related to module metadata keys.
         *
         * @namespace Metadata.Module
         * @enum {string}
         */
        export enum Module {
            Tasks = "tasks",
        }

        /**
         * Enumerations related to runner metadata keys.
         *
         * @namespace Metadata.Runner
         * @enum {string}
         */
        export enum Runner {
            AppIndex = "app-index",
            LoggerIndex = "logger-index",
            DtoIndex = "dto-index",
            Dto = "dto",
        }

        /**
         * Enumerations related to DTO (Data Transfer Object) metadata keys.
         *
         * @namespace Metadata.Dto
         * @enum {string}
         */
        export enum Dto {
            Property = "property",
        }
    }
}
