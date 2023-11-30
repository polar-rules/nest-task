/**
 * @fileoverview
 *
 * File is auto-generated
 * !!! Avoid any changes to this file !!!
 * In case you need to generate a new file, run `node bin/generators/generators.index` from the project root.
 */

import * as $_Types from "./transformers.types.js";

import * as $_Errors from "./errors/index.js";
import * as $_Prettify from "./transformers.prettify.js";
import * as $_ToLowerCase from "./transformers.to-lower-case.js";
import * as $_ToSnakeCase from "./transformers.to-snake-case.js";
import * as $_ToUpperCase from "./transformers.to-upper-case.js";

/**
 * Namespace containing various modules related to the 'Transformers' functionality.
 *
 * @namespace
 */
export namespace Transformers {
    /**
     * Namespace containing functionality related to the 'Types' module.
     *
     * @namespace
     */
    export import Types = $_Types._Types;

    /**
     * Namespace containing functionality related to the 'Errors' module.
     *
     * @namespace
     */
    export import Errors = $_Errors._Errors;
    /**
     * Namespace containing functionality related to the 'Prettify' module.
     *
     * @namespace
     */
    export import Prettify = $_Prettify._Prettify;
    /**
     * Namespace containing functionality related to the 'ToLowerCase' module.
     *
     * @namespace
     */
    export import ToLowerCase = $_ToLowerCase._ToLowerCase;
    /**
     * Namespace containing functionality related to the 'ToSnakeCase' module.
     *
     * @namespace
     */
    export import ToSnakeCase = $_ToSnakeCase._ToSnakeCase;
    /**
     * Namespace containing functionality related to the 'ToUpperCase' module.
     *
     * @namespace
     */
    export import ToUpperCase = $_ToUpperCase._ToUpperCase;
}
