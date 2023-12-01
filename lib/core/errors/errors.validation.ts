import { Errors } from "@errors/index.js";

/**
 * Represents an error class for validation issues.
 *
 * @class _Validation
 * @extends Errors.Base
 */
export class _Validation extends Errors.Base {
    /**
     * Creates a new instance of the `_Validation` error.
     *
     * @constructor
     * @param {Record<string, string[]>} object - An object containing validation issues.
     */
    constructor(object: Record<string, string[]>) {
        const infoMessage = "We located the following validation issues.";
        const lines = Object.keys(object).reduce<string[]>(
            (acc: string[], key: string): string[] => {
                const errors = object[key];

                if (!errors) {
                    return acc;
                }

                acc.push(`  ${key}:`);

                for (const error of errors) {
                    acc.push(`    - ${error}`);
                }

                return acc;
            },
            [infoMessage],
        );

        super(lines.join("\n"));
    }
}
