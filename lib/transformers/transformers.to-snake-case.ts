import { Patches } from "@patches/index.js";

/**
 * Convert a string to snake case.
 *
 * @function _ToSnakeCase
 * @param {string} input - The input string to be converted.
 * @returns {string} The input string converted to snake case.
 */
export function _ToSnakeCase(input: string): string {
    return new Patches.String(input).toSnakeCase().toString();
}
