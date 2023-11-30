/**
 * @fileoverview
 *
 * File is auto-generated
 * !!! Avoid any changes to this file !!!
 * In case you need to generate a new file, run `node bin/generators/generators.index` from the project root.
 */

import * as $_Missing from "./missing/index.js";
import * as $_NoTasksIsFound from "./errors.no-tasks-is-found.js";
import * as $_Prettify from "./errors.prettify.js";
import * as $_Unhandled from "./errors.unhandled.js";

/**
 * Namespace containing various modules related to the '_Errors' functionality.
 *
 * @namespace
 */
export namespace _Errors {
    /**
     * Namespace containing functionality related to the 'Missing' module.
     *
     * @namespace
     */
    export import Missing = $_Missing._Missing;
    /**
     * Namespace containing functionality related to the 'NoTasksIsFound' module.
     *
     * @namespace
     */
    export import NoTasksIsFound = $_NoTasksIsFound._NoTasksIsFound;
    /**
     * Namespace containing functionality related to the 'Prettify' module.
     *
     * @namespace
     */
    export import Prettify = $_Prettify._Prettify;
    /**
     * Namespace containing functionality related to the 'Unhandled' module.
     *
     * @namespace
     */
    export import Unhandled = $_Unhandled._Unhandled;
}
