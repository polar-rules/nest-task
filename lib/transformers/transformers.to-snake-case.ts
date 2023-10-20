import { Patches } from "@patches/index.js";

export function _ToSnakeCase(input: string): string {
    return new Patches.String(input).toSnakeCase().toString();
}
