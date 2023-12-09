import { Core } from "@core/index.js";
import { Errors } from "@errors/index.js";

describe("Core::ProjectConfiguration::Errors::TaskIsMissing", (): void => {
    const Subject = Core.ProjectConfiguration.Errors.TaskIsMissing;

    it("Should extend Errors.Base", (): void => {
        const error = new Subject();
        expect(error).toBeInstanceOf(Errors.Base);
    });

    it("Should have the correct error message", (): void => {
        const error = new Subject();
        expect(error.message).toBe("The `task` key declaration is missing in `nest-cli.json`.");
    });
});
