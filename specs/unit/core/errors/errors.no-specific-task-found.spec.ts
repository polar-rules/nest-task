import { Core } from "@core/index.js";
import { Errors } from "@errors/index.js";

describe("Core::Errors::CannotResolveDependencies", (): void => {
    const Subject = Core.Errors.NoSpecificTaskFound;

    it("Should be an instance of Errors.Base", (): void => {
        const error = new Subject("example");
        expect(error).toBeInstanceOf(Errors.Base);
    });

    it("Should have the correct error message", (): void => {
        const taskName = "example";
        const error = new Subject(taskName);
        const expectations = `Unable to locate task with name: \`${taskName}\`!`;

        expect(error.message).toBe(expectations);
    });
});
