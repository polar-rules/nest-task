import * as path from "path";

import { jest } from "@jest/globals";

import { Tools } from "@tools/index.js";

export namespace _FindPackageJson {
    let spyOn: jest.SpiedFunction<any> | undefined;

    export const projectRoot: Readonly<string> = "test-project";

    export function mock(directory: string | null): void {
        spyOn = jest.spyOn(<any>Tools.PathManager.Main.instance, "findPackageJson").mockReturnValueOnce({
            next: () => ({
                value: directory
                    ? {
                          __path: path.join(directory, "package.json"),
                      }
                    : null,
            }),
        });
    }

    export function clean(): void {
        spyOn?.mockClear();
    }
}
