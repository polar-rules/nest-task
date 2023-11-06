import camelCase from "lodash.camelcase";
import snakeCase from "lodash.snakecase";
import kebabCase from "lodash.kebabcase";

export class _String extends String {
    public times(number: number): string {
        return Array(number).join(this.toString());
    }

    public namedInterpolation(replacements: Record<string, _String | string>): _String {
        const results = Object.keys(replacements).reduce((acc: string, key: string): string => {
            const regex = new RegExp(`\\$${key}`, "g");
            const replacement = replacements[key];

            return acc.replace(regex, replacement?.toString() ?? "");
        }, this.toString());

        return new _String(results);
    }

    public capitalize(): _String {
        return new _String(this.charAt(0).toUpperCase() + this.slice(1));
    }

    public lowerlize(): _String {
        return new _String(this.charAt(0).toLowerCase() + this.slice(1));
    }

    public toSnakeCase(): _String {
        return new _String(snakeCase(this.toString()));
    }

    public toCamelCase(): _String {
        return new _String(camelCase(this.toString())).lowerlize();
    }

    public toPascalCase(): _String {
        return this.toCamelCase().capitalize();
    }

    public toKebabCase(): _String {
        return new _String(kebabCase(this.toString()));
    }
}
