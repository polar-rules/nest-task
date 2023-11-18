import { Errors } from "@errors/index.js";
import { Transformers } from "@transformers/index.js";

export function _Prettify(error: Errors.Base): never {
    console.error(Transformers.Prettify(error.message, "red"));
    process.exit(1);
}
