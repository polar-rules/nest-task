import path from "path";
import findPackageJson from "find-package-json";

import { _Errors } from "./errors";

export class _Main {
    public static get projectRoot(): string {
        const finder = findPackageJson();
        const packageJson = finder.next().value;

        if (!packageJson) {
            throw new _Errors.NoPackageJson();
        }

        return path.dirname(packageJson.__path);
    }
}
