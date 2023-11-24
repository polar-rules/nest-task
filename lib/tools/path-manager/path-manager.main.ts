import * as path from "path";
import * as FindPackageJson from "find-package-json";

import { _Module as _ToolsModules } from "@tools/tools.module.js";

import { _Errors } from "./errors/index.js";

export class _Main {
    private static memo?: _Main;

    public static get instance(): _Main {
        if (!this.memo) {
            this.memo = new this();
        }

        return this.memo;
    }

    private constructor() {}

    public get projectRoot(): string {
        const someFolderInRoot = process.cwd();

        const finder = <FindPackageJson.FinderIterator>this.findPackageJson(someFolderInRoot);
        const packageJson = finder.next().value;

        if (!packageJson) {
            throw new _Errors.NoPackageJson();
        }

        return path.dirname(packageJson.__path);
    }

    private get findPackageJson(): FindPackageJson.FindLike {
        return typeof FindPackageJson === "function"
            ? FindPackageJson
            : (<FindPackageJson.Default>FindPackageJson).default;
    }

    public pathResolver(fileOrFolderPath: string): string {
        return path.join(this.projectRoot, fileOrFolderPath);
    }

    /**
     * Method resolve path to current `dist` folder of this package and which compiled code to use, CJS or ESM.
     * The downside of this method is that it's developed in purpose to be used only for package development.
     * As a result it will resolve path to any project `node_modules` root.
     * @param {string} filePath
     * @return {string}
     */
    public moduleTypePathResolver(filePath: string): string {
        return path.join(this.projectRoot, "dist", _ToolsModules.isCJS ? "cjs" : "esm", filePath);
    }

    /**
     * Method resolve path to current package. It doesn't matter if package is located in `node_modules` or
     * currently under development. It really on `__dirname` in case of CJS or on `imports.meta` in case of ESM.
     * @param {string} fileOrFolderPath - should be a path to the file, starting from `lib` folder
     * @return {string}
     */
    public packageResolver(fileOrFolderPath: string): string {
        const libPath = path.join(_ToolsModules.dirname, "..");

        return path.join(libPath, fileOrFolderPath);
    }
}
