import { jest } from "@jest/globals";

import { Tools } from "@tools/index.js";

import { Configs } from "@specs/configs/index.js";

export namespace _PathManager {
    export let projectRootSpyOn: jest.SpiedFunction<any>;

    export function projectRootMock(): void {
        projectRootSpyOn = jest
            .spyOn(Tools.PathManager.Main.instance, "projectRoot", "get")
            .mockImplementation(() => Configs.Constants.Folders.tmp);
    }

    export function clean(): void {
        projectRootSpyOn.mockClear();
    }
}
