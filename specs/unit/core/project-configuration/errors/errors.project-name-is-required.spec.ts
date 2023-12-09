import { Core } from "@core/index.js";
import { Errors } from "@errors/index.js";

describe("Core::ProjectConfiguration::Errors::ProjectNameIsRequired", (): void => {
    const Subject = Core.ProjectConfiguration.Errors.ProjectNameIsRequired;

    it("Should extend Errors.Base", (): void => {
        const error = new Subject();
        expect(error).toBeInstanceOf(Errors.Base);
    });

    it("Should have the correct error message", (): void => {
        const error = new Subject();
        expect(error.message).toBe("You need to select `projectName`.");
    });
});
