import * as path from "path";

import { Generators } from "@generators/index.js";
import { Configs } from "@specs/configs/index.js";

describe("Generators::Abstractions::FileResolver", (): void => {
    class Subject extends Generators.Abstractions.FileResolver {}

    describe("#directory", (): void => {
        it("should create an instance of _FileResolver with correct properties", () => {
            const folderName = Configs.Constants.Folders.tmp;
            const taskPath = "example";
            const subject = new Subject(folderName, taskPath);

            expect(subject.directory.endsWith(path.join(taskPath, folderName))).toBeTruthy();
        });
    });
});
