import * as path from "path";
import * as FindPackageJson from "find-package-json";

import { _Module as _ToolsModules } from "@tools/tools.module.js";
import { _Errors } from "./errors/index.js";

/**
 * Main utility class providing methods for project structure and path resolution.
 *
 * @class _Main
 */
export class _Main {
    private static memo?: _Main;

    /**
     * Gets the singleton instance of the class.
     *
     * @static
     * @readonly
     * @type {_Main}
     */
    public static get instance(): _Main {
        if (!this.memo) {
            this.memo = new this();
        }

        return this.memo;
    }

    /**
     * Private constructor to enforce singleton pattern.
     *
     * @private
     */
    private constructor() {}

    /**
     * Gets the root path of the project by finding the nearest `package.json`.
     *
     * @readonly
     * @type {string}
     * @throws {_Errors.NoPackageJson} Throws an error if no `package.json` is found.
     */
    public get projectRoot(): string {
        const someFolderInRoot = process.cwd();

        const finder = <FindPackageJson.FinderIterator>this.findPackageJson(someFolderInRoot);
        const packageJson = finder.next().value;

        if (!packageJson) {
            throw new _Errors.NoPackageJson();
        }

        return path.dirname(packageJson.__path);
    }

    /**
     * Gets the function for finding `package.json` based on the environment.
     *
     * @private
     * @type {FindPackageJson.FindLike}
     */
    private get findPackageJson(): FindPackageJson.FindLike {
        return typeof FindPackageJson === "function"
            ? FindPackageJson
            : (<FindPackageJson.Default>FindPackageJson).default;
    }

    /**
     * Resolves a file or folder path relative to the project root.
     *
     * @param {string} fileOrFolderPath - The path to the file or folder.
     * @returns {string} The resolved path.
     */
    public pathResolver(fileOrFolderPath: string): string {
        return path.join(this.projectRoot, fileOrFolderPath);
    }

    /**
     * Resolves a file or folder path based on the module type (CJS or ESM).
     *
     * @param {string} filePath - The path to the file or folder.
     * @returns {string} The resolved path based on the module type.
     */
    public moduleTypePathResolver(filePath: string): string {
        return path.join(this.projectRoot, "dist", _ToolsModules.isCJS ? "cjs" : "esm", filePath);
    }

    /**
     * Resolves a file or folder path relative to the current package, considering development or `node_modules` usage.
     *
     * @param {string} fileOrFolderPath - The path to the file or folder starting from the `lib` folder.
     * @returns {string} The resolved path.
     */
    public packageResolver(fileOrFolderPath: string): string {
        const libPath = path.join(_ToolsModules.dirname, "..");

        return path.join(libPath, fileOrFolderPath);
    }
}
