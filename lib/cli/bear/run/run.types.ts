export namespace _Types {
    export namespace AddArgument {
        export interface Prompt {
            shouldAddArgument: string;
        }
    }

    export namespace AdditionalArgument {
        export interface Prompt {
            argumentKey: string;
            argumentValue: string;
        }
    }
}
