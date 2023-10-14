export namespace _Types {
    export interface Statements {
        types: string[];
        constants: string[];
        folders: string[];
        files: string[];
    }

    export interface FileLines {
        imports: Statements;
        exports: Statements;
    }

    export namespace Builder {
        export namespace Folder {
            export type Return = (folder: string) => void;
        }

        export namespace File {
            export type Return = (file: string) => void;
        }
    }

    export namespace Main {
        export interface Entities {
            types: string[];
            constants: string[];
            folders: string[];
            files: string[];
        }

        export namespace FilterOnAllowedFilesAndDirectories {
            export type Return = (fileOrDirectory: string) => boolean;
        }
    }
}
