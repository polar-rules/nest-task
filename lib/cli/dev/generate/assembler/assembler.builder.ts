import { Patches } from "@patches/index.js";

import { _Types } from "./assembler.types.js";
import { _Constants } from "./assembler.constants.js";

/**
 * Represents a builder class for generating module structures based on specified configurations.
 *
 * @class _Builder
 */
export class _Builder {
    /**
     * Creates an instance of _Builder.
     *
     * @constructor
     */
    public constructor() {
        this.moduleComments = this.moduleComments.bind(this);
    }

    /**
     * Generates folder-related code based on the provided file lines.
     *
     * @param { _Types.FileLines } fileLines - The file lines configuration.
     * @returns {_Types.Builder.Folder.Return} A function that adds folder-related code.
     */
    public folder(fileLines: _Types.FileLines): _Types.Builder.Folder.Return {
        return (folder: string): void => {
            const moduleName = new Patches.String(folder).capitalize().toPascalCase();
            const variableName = `$_${moduleName}`;
            const exportFrom = `./${folder}`;
            const subModuleName = [variableName, moduleName].join("._");

            fileLines.imports.folders.push(
                _Constants.Template.Import.folder.namedInterpolation({ variableName, exportFrom }).toString(),
            );
            this.moduleComments(fileLines.exports.folders, moduleName);
            fileLines.exports.folders.push(
                _Constants.Template.Export.statement.namedInterpolation({ moduleName, subModuleName }).toString(),
            );
        };
    }

    /**
     * Generates file-related code based on the provided file lines.
     *
     * @param { _Types.FileLines } fileLines - The file lines configuration.
     * @returns {_Types.Builder.File.Return} A function that adds file-related code.
     */
    public file(fileLines: _Types.FileLines): _Types.Builder.File.Return {
        return (file: string): void => {
            const isFileIgnored = _Constants.Files.ignore.some((item: string): boolean => file.endsWith(item));

            if (isFileIgnored) {
                return;
            }

            const moduleName = new Patches.String(file.split(".").at(-1)).capitalize().toPascalCase();
            const variableName = `$_${moduleName}`;
            const exportFrom = `./${file}`;
            const subModuleName = [variableName, moduleName].join("._");

            switch (moduleName.toString()) {
                case "Constants":
                    fileLines.imports.constants.push(
                        _Constants.Template.Import.file.namedInterpolation({ variableName, exportFrom }).toString(),
                    );
                    this.moduleComments(fileLines.exports.constants, moduleName);
                    fileLines.exports.constants.push(
                        _Constants.Template.Export.statement
                            .namedInterpolation({ moduleName, subModuleName })
                            .toString(),
                    );
                    break;
                case "Types":
                    fileLines.imports.types.push(
                        _Constants.Template.Import.file.namedInterpolation({ variableName, exportFrom }).toString(),
                    );
                    this.moduleComments(fileLines.exports.types, moduleName);
                    fileLines.exports.types.push(
                        _Constants.Template.Export.statement
                            .namedInterpolation({ moduleName, subModuleName })
                            .toString(),
                    );
                    break;
                default:
                    fileLines.imports.files.push(
                        _Constants.Template.Import.file.namedInterpolation({ variableName, exportFrom }).toString(),
                    );
                    this.moduleComments(fileLines.exports.files, moduleName);
                    fileLines.exports.files.push(
                        _Constants.Template.Export.statement
                            .namedInterpolation({ moduleName, subModuleName })
                            .toString(),
                    );
                    break;
            }
        };
    }

    /**
     * Adds module comments to the provided array.
     *
     * @param { string[] } array - The array to which comments will be added.
     * @param { Patches.String | string } moduleName - The name of the module.
     * @private
     */
    private moduleComments(array: string[], moduleName: Patches.String | string): void {
        array.push(_Constants.Template.Comments.start);
        array.push(_Constants.Template.Comments.namespaceComment.namedInterpolation({ moduleName }).toString());
        array.push(_Constants.Template.Comments.empty);
        array.push(_Constants.Template.Comments.namespace);
        array.push(_Constants.Template.Comments.end);
    }
}
