/**
 * @fileoverview
 *
 * File is auto-generated
 * !!! Avoid any changes to this file !!!
 * In case you need to generate a new file, run `node bin/generators/generators.index` from the project root.
 */

import * as $_MainAlreadyExist from "./errors.main-already-exist.js";
import * as $_MissingNestCli from "./errors.missing-nest-cli.js";
import * as $_MissingProjectConfiguration from "./errors.missing-project-configuration.js";
import * as $_ProjectNameIsRequired from "./errors.project-name-is-required.js";
import * as $_TaskIsMissing from "./errors.task-is-missing.js";
import * as $_TaskIsPresentInConfig from "./errors.task-is-present-in-config.js";

/**
 * Namespace containing various modules related to the '_Errors' functionality.
 *
 * @namespace
 */
export namespace _Errors {
    /**
     * Namespace containing functionality related to the 'MainAlreadyExist' module.
     *
     * @namespace
     */
    export import MainAlreadyExist = $_MainAlreadyExist._MainAlreadyExist;
    /**
     * Namespace containing functionality related to the 'MissingNestCli' module.
     *
     * @namespace
     */
    export import MissingNestCli = $_MissingNestCli._MissingNestCli;
    /**
     * Namespace containing functionality related to the 'MissingProjectConfiguration' module.
     *
     * @namespace
     */
    export import MissingProjectConfiguration = $_MissingProjectConfiguration._MissingProjectConfiguration;
    /**
     * Namespace containing functionality related to the 'ProjectNameIsRequired' module.
     *
     * @namespace
     */
    export import ProjectNameIsRequired = $_ProjectNameIsRequired._ProjectNameIsRequired;
    /**
     * Namespace containing functionality related to the 'TaskIsMissing' module.
     *
     * @namespace
     */
    export import TaskIsMissing = $_TaskIsMissing._TaskIsMissing;
    /**
     * Namespace containing functionality related to the 'TaskIsPresentInConfig' module.
     *
     * @namespace
     */
    export import TaskIsPresentInConfig = $_TaskIsPresentInConfig._TaskIsPresentInConfig;
}
