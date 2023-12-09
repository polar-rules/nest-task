import { Core } from "@core/index.js";
import { Errors } from "@errors/index.js";

describe("Core::Errors::NoFactoryFound", (): void => {
    const Subject = Core.Errors.NoFactoryFound;

    it("Should be an instance of Errors.Base", (): void => {
        const error = new Subject();
        expect(error).toBeInstanceOf(Errors.Base);
    });

    it("Should have the correct error message", (): void => {
        const error = new Subject();
        const expectations = "Unable to locate factory instance!";

        expect(error.message).toBe(expectations);
    });
});
