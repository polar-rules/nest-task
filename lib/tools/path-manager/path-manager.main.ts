import path from "path";
import findPackageJson from "find-package-json";

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
        const finder = findPackageJson(someFolderInRoot);
        const packageJson = finder.next().value;

        if (!packageJson) {
            throw new _Errors.NoPackageJson();
        }

        return path.dirname(packageJson.__path);
    }
}
