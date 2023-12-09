import { Core } from "@core/index.js";
import { Errors } from "@errors/index.js";

describe("Core::ProjectConfiguration::Errors::TaskIsPresentInConfig", (): void => {
    const Subject = Core.ProjectConfiguration.Errors.TaskIsPresentInConfig;

    it("Should extend Errors.Base", (): void => {
        const error = new Subject();
        expect(error).toBeInstanceOf(Errors.Base);
    });

    it("Should have the correct error message", (): void => {
        const error = new Subject();
        expect(error.message).toBe("The `task` key declaration is already present in `nest-cli.json`.");
    });
});
