import { Transformers } from "@transformers/index.js";

export function _Prettify(message: string): void {
    console.info(Transformers.Prettify(message, "white"));
}
