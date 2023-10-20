import * as fs from "fs/promises";
import * as path from "path";
import cloneDeep from "lodash.clonedeep";

import { Patches } from "@patches/index.js";

import { _Abstractions as _BinAbstractions } from "@bin/abstractions/index.js";

import { _Errors } from "./errors/index.js";

import { _Types } from "./assembler.types.js";
import { _Constants } from "./assembler.constants.js";
import { _Builder } from "./assembler.builder.js";
import { _Linter } from "./assembler.linter.js";

export class _Main extends _BinAbstractions.Loader {
    private readonly builder: _Builder = new _Builder();

    private readonly linter: _Linter = new _Linter();

    public finish(): void {
        this.ora.finish("Finished creating all `index.ts` files.");
    }

    public async topLevelDirectories(): Promise<string[]> {
        const libDir = await fs.readdir(_Constants.Directories.Paths.lib);
        const specsDir = await fs.readdir(_Constants.Directories.Paths.specs);

        const lib = libDir
            .filter((item) => !item.includes("."))
            .map((item) => path.resolve(_Constants.Directories.Paths.lib, item));
        const specs = specsDir
            .filter((item) => !item.includes("."))
            .map((item) => path.resolve(_Constants.Directories.Paths.specs, item));

        return [...lib, ...specs];
    }

    public async generate(directory: string): Promise<void> {
        this.ora.message(`Creating \`index.ts\` files for ${directory}`);

        const templateFile = await fs.readFile(_Constants.Template.location);
        const template = new Patches.String(templateFile.toString().split("\n").slice(1).join("\n"));
        const filesAndFoldersInDirectory = await fs.readdir(directory);
        const moduleNameInKebabCase = directory.split("/").at(-1);

        if (!moduleNameInKebabCase) {
            throw new _Errors.MissingName();
        }

        const moduleName = new Patches.String(moduleNameInKebabCase).capitalize().toPascalCase();
        const fileLines = cloneDeep(_Constants.Dummies.fileLines);
        const entities = cloneDeep(_Constants.Dummies.fileLines);

        for (const file of filesAndFoldersInDirectory) {
            await this.queueOrDiveDeeper(entities, directory, file);
        }

        const shouldIgnoreDirectory = _Constants.Directories.ignore.some((item: string): boolean =>
            directory.endsWith(item),
        );

        if (shouldIgnoreDirectory) {
            return;
        }

        entities.imports.folders.forEach(this.builder.folder(fileLines));
        entities.imports.files.forEach(this.builder.file(fileLines));
        entities.imports.types.forEach(this.builder.file(fileLines));
        entities.imports.constants.forEach(this.builder.file(fileLines));

        const topLevelDirectories = await this.topLevelDirectories();
        const isPublicModule = topLevelDirectories.some((item: string): boolean => directory.endsWith(item));

        const content = template.namedInterpolation({
            moduleName: isPublicModule ? moduleName.toString() : `_${moduleName.toString()}`,
            typeImports: fileLines.imports.types.join("\n"),
            constantsImports: fileLines.imports.constants.join("\n"),
            folderImports: fileLines.imports.folders.join("\n"),
            fileImports: fileLines.imports.files.join("\n"),
            typeExports: fileLines.exports.types.join("\n"),
            constantsExports: fileLines.exports.constants.join("\n"),
            folderExports: fileLines.exports.folders.join("\n"),
            fileExports: fileLines.exports.files.join("\n"),
        });

        const indexPath = path.join(directory, "index.ts");

        await fs.writeFile(indexPath, content.toString(), { encoding: "utf8", flag: "w" });

        const formattedContent = await this.linter.format(content.toString(), indexPath);

        if (!formattedContent) {
            return;
        }

        await fs.writeFile(indexPath, formattedContent, { encoding: "utf8", flag: "w" });
    }

    private async queueOrDiveDeeper(entities: _Types.FileLines, directory: string, file: string): Promise<void> {
        const filePath = path.join(directory, file);

        const fileStats = await fs.stat(filePath);
        const isDirectory = fileStats.isDirectory();
        const importFrom = filePath.split("/").at(-1);

        if (!importFrom) {
            return;
        }

        if (!isDirectory) {
            const shouldIgnoreExtension = _Constants.Extensions.ignore.some((item: string): boolean =>
                file.endsWith(item),
            );
            const shouldIgnoreFile = _Constants.Files.ignore.some((item: string): boolean => file.endsWith(item));

            if (shouldIgnoreExtension || shouldIgnoreFile) {
                return;
            }

            const importFromWithCutExtension = importFrom.slice(0, importFrom.lastIndexOf("."));
            const fileType = importFromWithCutExtension.split(".").at(-1);

            switch (fileType) {
                case "constants":
                    entities.imports.constants.push(importFromWithCutExtension);
                    break;
                case "types":
                    entities.imports.types.push(importFromWithCutExtension);
                    break;
                default:
                    entities.imports.files.push(importFromWithCutExtension);
                    break;
            }

            return;
        }

        const shouldIgnore = _Constants.Directories.ignore.some((item: string): boolean => filePath.endsWith(item));

        if (!shouldIgnore) {
            entities.imports.folders.push(importFrom);
        }

        await this.generate(filePath);
    }
}
