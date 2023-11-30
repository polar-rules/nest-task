import { ESLint } from "eslint";
import Prettier from "prettier";

import { _Constants } from "./assembler.constants.js";

/**
 * Represents a class for linting and formatting code using ESLint and Prettier.
 *
 * @class _Linter
 */
export class _Linter {
    /**
     * Creates an instance of _Linter.
     *
     * @constructor
     */
    public constructor() {}

    /**
     * Gets the ESLint instance with specific configuration options.
     *
     * @private
     * @returns {ESLint} The ESLint instance.
     */
    private get eslint(): ESLint {
        return new ESLint({
            overrideConfigFile: _Constants.Files.eslintConfig,
            fix: true,
        });
    }

    /**
     * Formats the provided content using ESLint and Prettier.
     *
     * @param {string} content - The code content to be formatted.
     * @param {string} filePath - The file path of the code.
     * @returns {Promise<string | undefined>} Resolving to the formatted code or undefined if there are issues.
     */
    public async format(content: string, filePath: string): Promise<string | undefined> {
        const lintResults = await this.eslint.lintText(content.toString(), { filePath });
        const contentAfterEslint = lintResults.at(0);

        if (!contentAfterEslint) {
            return;
        }

        if (!contentAfterEslint.output) {
            return;
        }

        const prettierOptions = await Prettier.resolveConfig(_Constants.Files.prettierConfig);

        return await Prettier.format(contentAfterEslint.output, { ...prettierOptions, filepath: filePath });
    }
}
