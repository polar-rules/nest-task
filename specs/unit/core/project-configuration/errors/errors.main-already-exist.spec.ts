import { Core } from "@core/index.js";
import { Errors } from "@errors/index.js";

describe("Core::ProjectConfiguration::Errors::MainAlreadyExist", (): void => {
    const Subject = Core.ProjectConfiguration.Errors.MainAlreadyExist;

    it("Should extend Errors.Base", (): void => {
        const error = new Subject("/existing/file/path");
        expect(error).toBeInstanceOf(Errors.Base);
    });

    it("Should have the correct error message", (): void => {
        const path = "/existing/file/path";
        const error = new Subject(path);
        expect(error.message).toBe(`File \`${path}\` already exists!`);
    });

    it("Should not throw an error with an empty path", (): void => {
        expect(() => new Subject("")).not.toThrow();
    });

    it("Should not throw an error with undefined path", (): void => {
        expect(() => new Subject(undefined as any)).not.toThrow();
    });
});
