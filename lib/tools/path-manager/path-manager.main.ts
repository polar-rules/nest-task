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
        const finder = ((findPackageJson as any)?.default ?? findPackageJson)(someFolderInRoot);
        const packageJson = finder.next().value;

        if (!packageJson) {
            throw new _Errors.NoPackageJson();
        }

        return path.dirname(packageJson.__path);
    }

    public moduleTypePathResolver(filePath: string): string {
        return path.join(this.projectRoot, "dist", _ToolsModules.isCJS ? "cjs" : "esm", filePath);
    }
}
