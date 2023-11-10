import { _Create } from "./create/index.js";
import { _Info } from "./info/index.js";
import { _Run } from "./run/index.js";
import { _Setup } from "./setup/index.js";

export namespace _Types {
    export type OtherArguments =
        | _Create.Types.ExpectedArguments
        | _Info.Types.ExpectedArguments
        | _Run.Types.ExpectedArguments
        | _Setup.Types.ExpectedArguments;
}
