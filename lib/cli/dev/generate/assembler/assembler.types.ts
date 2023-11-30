/**
 * Represents custom types and interfaces for the `_Types` namespace.
 * @namespace _Types
 */
export namespace _Types {
    /**
     * Defines the structure of statements within the `FileLines` interface.
     * @interface Statements
     */
    export interface Statements {
        types: string[];
        constants: string[];
        folders: string[];
        files: string[];
    }

    /**
     * Defines the structure of file lines within the `_Types` namespace.
     * @interface FileLines
     */
    export interface FileLines {
        imports: Statements;
        exports: Statements;
    }

    /**
     * Represents custom types for the `_Builder` namespace.
     * @namespace Builder
     */
    export namespace Builder {
        /**
         * Represents a custom type for the `Return` function within the `Folder` namespace.
         * @namespace Folder
         * @type {Return}
         */
        export namespace Folder {
            export type Return = (folder: string) => void;
        }

        /**
         * Represents a custom type for the `Return` function within the `File` namespace.
         * @namespace File
         * @type {Return}
         */
        export namespace File {
            export type Return = (file: string) => void;
        }
    }

    /**
     * Represents custom types for the `Main` namespace.
     * @namespace Main
     */
    export namespace Main {
        /**
         * Defines the structure of entities within the `Main` namespace.
         * @interface Entities
         */
        export interface Entities {
            types: string[];
            constants: string[];
            folders: string[];
            files: string[];
        }

        /**
         * Represents custom types for the `FilterOnAllowedFilesAndDirectories` namespace.
         * @namespace FilterOnAllowedFilesAndDirectories
         */
        export namespace FilterOnAllowedFilesAndDirectories {
            /**
             * Represents a custom type for the `Return` function within the `FilterOnAllowedFilesAndDirectories`
             * namespace.
             * @type {Return}
             */
            export type Return = (fileOrDirectory: string) => boolean;
        }
    }
}
