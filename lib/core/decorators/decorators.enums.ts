export namespace _Enums {
    export namespace Metadata {
        export enum BuildIn {
            ParamTypes = "design:paramtypes",
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
    }
}
