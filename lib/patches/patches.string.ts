import camelCase from "lodash.camelcase";
import snakeCase from "lodash.snakecase";
import kebabCase from "lodash.kebabcase";

/**
 * Class extending the built-in String class with additional utility methods for string manipulation.
 *
 * @class _String
 */
export class _String extends String {
    /**
     * Repeats the string a specified number of times.
     *
     * @param {number} number - The number of times to repeat the string.
     * @returns {string} - The repeated string.
     */
    public times(number: number): string {
        return Array(number).join(this.toString());
    }

    /**
     * Performs named interpolation on the string using a replacements object.
     *
     * @param {Record<string, _String | string>} replacements - An object mapping names to replacement values.
     * @returns {_String} - A new _String with interpolated values.
     */
    public namedInterpolation(replacements: Record<string, _String | string>): _String {
        const results = Object.keys(replacements).reduce((acc: string, key: string): string => {
            const regex = new RegExp(`\\$${key}`, "g");
            const replacement = replacements[key];

            return acc.replace(regex, replacement?.toString() ?? "");
        }, this.toString());

        return new _String(results);
    }

    /**
     * Capitalizes the first letter of the string.
     *
     * @returns {_String} - A new _String with the first letter capitalized.
     */
    public capitalize(): _String {
        return new _String(this.charAt(0).toUpperCase() + this.slice(1));
    }

    /**
     * Converts the first letter of the string to lowercase.
     *
     * @returns {_String} - A new _String with the first letter in lowercase.
     */
    public lowerlize(): _String {
        return new _String(this.charAt(0).toLowerCase() + this.slice(1));
    }

    /**
     * Converts the string to snake_case.
     *
     * @returns {_String} - A new _String in snake_case.
     */
    public toSnakeCase(): _String {
        return new _String(snakeCase(this.toString()));
    }

    /**
     * Converts the string to camelCase.
     *
     * @returns {_String} - A new _String in camelCase.
     */
    public toCamelCase(): _String {
        return new _String(camelCase(this.toString())).lowerlize();
    }

    /**
     * Converts the string to PascalCase.
     *
     * @returns {_String} - A new _String in PascalCase.
     */
    public toPascalCase(): _String {
        return this.toCamelCase().capitalize();
    }

    /**
     * Converts the string to kebab-case.
     *
     * @returns {_String} - A new _String in kebab-case.
     */
    public toKebabCase(): _String {
        return new _String(kebabCase(this.toString()));
    }
}
