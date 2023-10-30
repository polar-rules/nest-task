export namespace _Types {
    export interface Task {
        path: string;
        entryPoint: string;
    }

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
            task?: Task;
        }
    }
}
