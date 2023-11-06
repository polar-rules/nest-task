import { _Abstractions } from "./abstractions/index.js";

export namespace _Types {
    export type Task = _Abstractions.Types.FileResolver.ApproximateTask;

    export namespace Configuration {
        export interface ApproximateProject {
            type: string;
            root: string;
            entryFile: string;
            sourceRoot: string;
            task?: Task;
        }

        export interface ApproximateWithProjects {
            projects: Record<string, ApproximateProject>;
        }

        export interface Approximate extends Partial<ApproximateWithProjects> {
            sourceRoot?: string;
            task?: Task;
        }
    }
}
