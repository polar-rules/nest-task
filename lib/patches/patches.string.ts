import { Transformers } from "@transformers/index.js";

export class _String extends String {
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
        return new _String(
            this.replace(/\W+/g, " ")
                .split(/ |\B(?=[A-Z])/)
                .map(Transformers.ToLowerCase)
                .join("_"),
        );
    }

    public toCamelCase(): _String {
        return new _String(
            this.toLowerCase()
                .replace(/[^a-zA-Z0-9]+(.)/g, (_: string, char: string) => Transformers.ToUpperCase(char))
                .replace(/(\b\w)/g, (_: string, char: string) => Transformers.ToUpperCase(char)),
        ).lowerlize();
    }

    public toPascalCase(): _String {
        return this.toCamelCase().capitalize();
    }

    public toKebabCase(): _String {
        return new _String(
            this.replace(/([a-z])([A-Z])/g, "$1-$2")
                .replace(/[\s_]+/g, "-")
                .toLowerCase(),
        );
    }
}
