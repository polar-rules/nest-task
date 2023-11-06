import * as path from "path";
import * as findPackageJson from "find-package-json";

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

        const finder = <findPackageJson.FinderIterator>this.FindPackageJson(someFolderInRoot);
        const packageJson = finder.next().value;

        if (!packageJson) {
            throw new _Errors.NoPackageJson();
        }

        return path.dirname(packageJson.__path);
    }

    private get FindPackageJson() {
        return typeof findPackageJson === "function" ? findPackageJson : (<any>findPackageJson).default;
    }

    public pathResolver(fileOrFolderPath: string): string {
        return path.join(this.projectRoot, fileOrFolderPath);
    }

    public moduleTypePathResolver(filePath: string): string {
        return path.join(this.projectRoot, "dist", _ToolsModules.isCJS ? "cjs" : "esm", filePath);
    }

    public packageResolver(fileOrFolderPath: string): string {
        const libPath = path.join(_ToolsModules.dirname, "..");

        return path.join(libPath, fileOrFolderPath);
    }
}
