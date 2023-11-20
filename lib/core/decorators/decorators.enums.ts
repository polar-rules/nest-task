export namespace _Enums {
    export namespace Metadata {
        export enum BuildIn {
            ParamTypes = "design:paramtypes",
            DesignType = "design:type",
        }

        export enum Watermarks {
            Task = "__task__",
            Module = "__module__",
            Runner = "__runner__",
        }

        export enum Descriptable {
            Name = "name",
            Description = "description",
        }

        export enum Task {
            Module = "module",
            Runner = "runner",
            Providers = "providers",
        }

        export enum Module {
            Tasks = "tasks",
        }

        export enum Runner {
            AppIndex = "app-index",
            DtoIndex = "dto-index",
            Dto = "dto",
        }

        export enum Dto {
            Property = "property",
        }
    }
}
