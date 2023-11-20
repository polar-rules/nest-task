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
