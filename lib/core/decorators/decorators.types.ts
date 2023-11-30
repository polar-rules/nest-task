import { Interfaces } from "@interfaces/index.js";

import { _Enums } from "./decorators.enums.js";

/**
 * Namespace containing various types used in decorators.
 *
 * @namespace _Types
 */
export namespace _Types {
    /**
     * Type representing metadata with descriptable properties.
     *
     * @type {Record<_Enums.Metadata.Descriptable, string>}
     */
    export type Descriptable = Record<_Enums.Metadata.Descriptable, string>;

    /**
     * Type representing keys of descriptable metadata.
     *
     * @type {keyof Descriptable}
     */
    export type DescriptableKeys = keyof Descriptable;

    /**
     * Namespace containing types related to the Task decorator.
     *
     * @namespace Task
     */
    export namespace Task {
        /**
         * Type representing metadata for a task with descriptable properties and additional properties.
         *
         * @type {Descriptable & OwnProperties}
         */
        export type Metadata = Descriptable & OwnProperties;

        /**
         * Type representing keys of the task metadata.
         *
         * @type {keyof Metadata}
         */
        export type MetadataKeys = keyof Metadata;

        /**
         * Interface representing additional properties for task metadata.
         *
         * @interface OwnProperties
         */
        interface OwnProperties {
            [_Enums.Metadata.Task.Module]: Interfaces.General.AnyClass;
            [_Enums.Metadata.Task.Runner]: Interfaces.General.AnyClass;
            [_Enums.Metadata.Task.Providers]?: Interfaces.General.AnyClass[];
        }
    }

    /**
     * Namespace containing types related to the Module decorator.
     *
     * @namespace Module
     */
    export namespace Module {
        /**
         * Type representing metadata for a module.
         *
         * @type {Record<_Enums.Metadata.Module, Interfaces.General.AnyClass[]>}
         */
        export type Metadata = Record<_Enums.Metadata.Module, Interfaces.General.AnyClass[]>;

        /**
         * Type representing keys of the module metadata.
         *
         * @type {keyof Metadata}
         */
        export type MetadataKeys = keyof Metadata;
    }

    /**
     * Namespace containing types related to property metadata.
     *
     * @namespace Property
     */
    export namespace Property {
        /**
         * Type representing possible property types.
         *
         * @type {"string" | "number" | "boolean" | "null" | "undefined"}
         */
        export type Types = "string" | "number" | "boolean" | "null" | "undefined";

        /**
         * Interface representing a property with a name and type.
         *
         * @interface Property
         */
        export interface Property {
            name: string;
            type: Types;
        }
    }
}
