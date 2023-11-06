import { ESLint } from "eslint";
import Prettier from "prettier";

import { _Constants } from "./assembler.constants.js";

export class _Linter {
    public constructor() {}

    private get eslint(): ESLint {
        return new ESLint({
            overrideConfigFile: _Constants.Files.eslintConfig,
            fix: true,
        });
    }

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
