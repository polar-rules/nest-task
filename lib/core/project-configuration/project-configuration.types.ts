export namespace _Types {
    export interface ApproximateProject {
        type: string;
        root: string;
        entryFile: string;
        sourceRoot: string;
    }

    export interface ApproximateConfiguration {
        projects?: Record<string, ApproximateProject>;
    }
}
