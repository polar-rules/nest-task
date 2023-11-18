import { Transformers } from "@transformers/index.js";

export function _Command(index: string): never {
    console.error(
        Transformers.Prettify(`Incorrect arguments! You need to pass \`command\` as a ${index} argument.`, "red"),
    );
    process.exit(1);
}
