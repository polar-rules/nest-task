import * as path from "path";

import { Generators } from "@generators/index.js";
import { Configs } from "@specs/configs/index.js";

describe("Generators::Index", (): void => {
    const Subject = Generators.Index;

    describe("#path", (): void => {
        it("Should correctly resolve path", (): void => {
            const folderName = "example";
            const taskPath = Configs.Constants.Folders.tmp;
            const subject = new Subject(folderName, taskPath);

            expect(subject.path.endsWith(path.join(taskPath, folderName, "index.ts"))).toBeTruthy();
        });
    });
});
