import { _General } from "@interfaces/interfaces.general.js";

declare module "class-transformer/cjs/storage.js" {
    type FindTypeMetadata = (klass: _General.AnyClass, key: string) => TypeMetadata;

    interface DefaultMetadataStorage {
        findTypeMetadata: FindTypeMetadata;
    }

    export interface TypeMetadata {
        target: _General.AnyClass;
        propertyName: string | symbol;
        reflectedType: (value: any) => any;
        typeFunction: () => (value: any) => any;
        options: object;
    }

    export const defaultMetadataStorage: DefaultMetadataStorage;
}

declare module "ora" {
    import * as Ora from "ora";

    interface ReturnType {
        start: () => Ora.Ora;
    }

    export type OraLike = (options: Ora.Options) => ReturnType;

    export interface Default {
        default: OraLike;
    }
}

declare module "chalk" {
    import * as chalk from "chalk";

    export interface Default {
        default: typeof chalk;
    }
}

declare module "find-package-json" {
    import * as FindPackageJson from "find-package-json";

    export type FindLike = (args: string) => FindPackageJson.FinderIterator;

    export interface Default {
        default: typeof FindLike;
    }
}
