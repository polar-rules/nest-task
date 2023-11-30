import { _Create } from "./create/index.js";
import { _Info } from "./info/index.js";
import { _Run } from "./run/index.js";
import { _Setup } from "./setup/index.js";

/**
 * Namespace containing types related to command-line arguments for Bear tasks.
 *
 * @namespace _Types
 */
export namespace _Types {
    /**
     * Union type representing expected command-line arguments for Bear tasks.
     *
     * @type {_Create.Types.ExpectedArguments |
     *  _Info.Types.ExpectedArguments |
     *  _Run.Types.ExpectedArguments |
     *  _Setup.Types.ExpectedArguments}
     */
    export type Args =
        | _Create.Types.ExpectedArguments
        | _Info.Types.ExpectedArguments
        | _Run.Types.ExpectedArguments
        | _Setup.Types.ExpectedArguments;
}
