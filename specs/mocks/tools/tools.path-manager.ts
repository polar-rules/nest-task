import { jest } from "@jest/globals";

import { Tools } from "@tools/index.js";

import { Configs } from "@specs/configs/index.js";

import { _FindPackageJson } from "@specs/mocks/mocks.find-package-json.js";

export namespace _PathManager {
    export let projectRootSpyOn: jest.SpiedFunction<any> | undefined;

    export const projectRoot: Readonly<string> = "test-project";

    export function projectRootMock(): void {
        projectRootSpyOn = jest
            .spyOn(Tools.PathManager.Main.instance, "projectRoot", "get")
            .mockImplementation(() => Configs.Constants.Folders.tmp);
    }

    export function findPackageJsonMock(directory: string | null): void {
        _FindPackageJson.mock(directory);
    }

    export function clean(): void {
        _FindPackageJson.clean();
        projectRootSpyOn?.mockClear();
    }
}
