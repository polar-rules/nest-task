import { _ToLowerCase } from "./transformers.to-lower-case";

export function _ToSnakeCase(input: string): string {
    return input
        .replace(/\W+/g, " ")
        .split(/ |\B(?=[A-Z])/)
        .map(_ToLowerCase)
        .join("_");
}
