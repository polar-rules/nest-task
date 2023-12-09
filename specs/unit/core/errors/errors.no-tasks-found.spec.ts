import { Core } from "@core/index.js";
import { Errors } from "@errors/index.js";

describe("Core::Errors::NoTasksFound", (): void => {
    const Subject = Core.Errors.NoTasksFound;

    it("Should be an instance of Errors.Base", (): void => {
        const error = new Subject();
        expect(error).toBeInstanceOf(Errors.Base);
    });

    it("Should have the correct error message", (): void => {
        const error = new Subject();
        const expectations = "Unable to locate any tasks!";

        expect(error.message).toBe(expectations);
    });
});
