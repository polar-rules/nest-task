export namespace _Types {
    export interface Task {
        configPath: string;
    }

    export interface ApproximateProject {
        type: string;
        root: string;
        entryFile: string;
        sourceRoot: string;
    }

    export interface ApproximateNativeConfiguration {
        projects?: Record<string, ApproximateProject>;
    }

    export interface TaskConfiguration {
        task: Task;
    }

    export type ApproximateConfiguration = ApproximateNativeConfiguration & TaskConfiguration;
}
