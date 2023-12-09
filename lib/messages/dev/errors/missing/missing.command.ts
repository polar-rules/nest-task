import { Transformers } from "@transformers/index.js";

/**
 * Display an error message about incorrect arguments and exit the process.
 *
 * @param {string} index - The position index of the missing command argument.
 * @throws This function always throws an error and terminates the process.
 */
export function _Command(index: string): void {
    console.error(
        Transformers.Prettify(`Incorrect arguments! You need to pass \`command\` as a ${index}-ish argument.`, "red"),
    );
}
