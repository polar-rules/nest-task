import * as fs from "fs/promises";
import * as path from "path";

import { Tools } from "@tools/index.js";

import { _Abstractions } from "@cli/abstractions/index.js";

import { _Types } from "./config.types.js";
import { _Constants } from "./config.constants.js";

/**
 * Represents the main class for updating Jest and TypeScript configurations.
 *
 * @class _Main
 * @extends _Abstractions.Loader
 */
export class _Main extends _Abstractions.Loader {
    /**
     * Gets the path to the Jest configuration file.
     *
     * @member {string} jestConfigPath
     * @private
     */
    private get jestConfigPath(): string {
        const projectRoot = Tools.PathManager.Main.instance.projectRoot;

        return path.join(projectRoot, _Constants.Jest.fileName);
    }

    /**
     * Gets the path to the TypeScript configuration file.
     *
     * @member {string} typescriptConfigPath
     * @private
     */
    private get typescriptConfigPath(): string {
        const projectRoot = Tools.PathManager.Main.instance.projectRoot;

        return path.join(projectRoot, _Constants.Typescript.fileName);
    }

    /**
     * Finishes the configuration update and prints a completion message.
     *
     * @method finish
     * @public
     * @returns {void}
     */
    public finish(): void {
        this.ora.finish(`Updated \`${_Constants.Jest.fileName}\` in project root`);
    }

    /**
     * Generates and updates the Jest and TypeScript configurations.
     *
     * @method generate
     * @public
     * @returns {Promise<void>} A Promise that resolves when the generation is complete.
     */
    public async generate(): Promise<void> {
        const jestConfig = await this.jestConfig();
        const typescriptConfig = await this.typescriptConfig();

        this.ora.message("Substituting");

        const moduleNameMapper = Object.entries(typescriptConfig.compilerOptions.paths).reduce(
            this.processModuleMapper,
            {},
        );

        jestConfig.moduleNameMapper = this.sort(moduleNameMapper);

        await this.writeJestConfig(jestConfig);
    }

    /**
     * Processes the module mapper entries for Jest configuration.
     *
     * @method processModuleMapper
     * @private
     * @param {Record<string, string[]>} acc - The accumulator object.
     * @param {[_Types.Main.StringAndArrayOfStrings]} - The key-value pair representing module mapping.
     * @returns {Record<string, string[]>} The updated accumulator.
     */
    private processModuleMapper(
        acc: Record<string, string[]>,
        [key, value]: _Types.Main.StringAndArrayOfStrings,
    ): Record<string, string[]> {
        if (!key || !value) {
            return acc;
        }

        const namespaceWithAtSign = key.split("/").at(0);

        if (!namespaceWithAtSign) {
            return acc;
        }

        const namespace = namespaceWithAtSign.split("@").at(1);

        if (!namespace) {
            return acc;
        }

        const modulePathWithStarSign = value.at(0);

        if (!modulePathWithStarSign) {
            return acc;
        }

        const modulePath = modulePathWithStarSign.split("*").at(0);

        if (!modulePath) {
            return acc;
        }

        const aliases: _Types.Main.Aliases = {};

        switch (true) {
            case key.includes("*"):
                aliases.key = `^@${namespace}/(.*).js`;
                aliases.value = [`<rootDir>/${modulePath}$1`];
                break;
            default:
                aliases.key = `^@${namespace}/index.js`;
                aliases.value = [`<rootDir>/${modulePath}.js`];
                break;
        }

        acc[aliases.key] = aliases.value;

        return acc;
    }

    /**
     * Sorts the module name mapper for Jest configuration.
     *
     * @method sort
     * @private
     * @param {Record<string, string[]>} moduleNameMapper - The module name mapper to be sorted.
     * @returns {Record<string, string[]>} The sorted module name mapper.
     */
    private sort(moduleNameMapper: Record<string, string[]>): Record<string, string[]> {
        const keysWithIndex: Record<string, string[]> = {};
        const keysWithoutIndex: Record<string, string[]> = {};
        const defaultKeys: Record<string, string[]> = { "(.*)\\.js$": ["$1"] };

        for (const [key, value] of Object.entries(moduleNameMapper)) {
            const modulePath = value?.at(0);

            if (!modulePath) {
                continue;
            }

            switch (true) {
                case modulePath.includes("index"):
                    keysWithIndex[key] = value;
                    break;
                default:
                    keysWithoutIndex[key] = value;
                    break;
            }
        }

        return {
            ...keysWithoutIndex,
            ...keysWithIndex,
            ...defaultKeys,
        };
    }

    /**
     * Writes the updated Jest configuration to the file.
     *
     * @method writeJestConfig
     * @private
     * @param {_Types.Jest.ApproximateConfig} config - The updated Jest configuration.
     * @returns {Promise<void>} A Promise that resolves when the write operation is complete.
     */
    private async writeJestConfig(config: _Types.Jest.ApproximateConfig): Promise<void> {
        this.ora.message(`Writing \`${_Constants.Jest.fileName}\``);

        await fs.writeFile(this.jestConfigPath, JSON.stringify(config, null, 4));
    }

    /**
     * Reads and returns the Jest configuration.
     *
     * @method jestConfig
     * @private
     * @returns {Promise<_Types.Jest.ApproximateConfig>} A Promise that resolves to the Jest configuration.
     */
    private async jestConfig(): Promise<_Types.Jest.ApproximateConfig> {
        this.ora.message(`Reading \`${_Constants.Jest.fileName}\``);

        const file = await fs.readFile(this.jestConfigPath);

        return JSON.parse(file.toString("utf-8"));
    }

    /**
     * Reads and returns the TypeScript configuration.
     *
     * @method typescriptConfig
     * @private
     * @returns {Promise<_Types.Typescript.ApproximateConfig>} A Promise that resolves to the TypeScript configuration.
     */
    private async typescriptConfig(): Promise<_Types.Typescript.ApproximateConfig> {
        this.ora.message(`Reading \`${_Constants.Typescript.fileName}\``);

        const file = await fs.readFile(this.typescriptConfigPath);

        return JSON.parse(file.toString("utf-8"));
    }
}
