import { Errors } from "@errors/index.js";
import { Tools } from "@tools/index.js";

describe("_NoPackageJson", (): void => {
    const Subject = Tools.PathManager.Errors.NoPackageJson;

    it("Should be an instance of Errors.Base", (): void => {
        const subject = new Subject();

        expect(subject).toBeInstanceOf(Errors.Base);
    });

    it("Should have the correct error message", (): void => {
        const subject = new Subject();

        expect(subject.message).toBe("No `package.json` was found!");
    });
});
