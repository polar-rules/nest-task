import camelCase from "lodash.camelcase";
import snakeCase from "lodash.snakecase";
import kebabCase from "lodash.kebabcase";

export namespace _Libraries {
    export interface Lodash {
        camelCase: typeof camelCase;
        snakeCase: typeof snakeCase;
        kebabCase: typeof kebabCase;
    }
}
