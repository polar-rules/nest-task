import { Core } from "@core/index.js";
import { Errors } from "@errors/index.js";

describe("Core::Errors::NotRunnerSubclass", (): void => {
    const Subject = Core.Errors.NotRunnerSubclass;

    it("Should be an instance of Errors.Base", (): void => {
        const error = new Subject();
        expect(error).toBeInstanceOf(Errors.Base);
    });

    it("Should have the correct error message", (): void => {
        const error = new Subject();
        const expectations =
            "Execution class is not inherited from `Abstractions::Runner` class. Check your `runner` key in `@Task` definition";

        expect(error.message).toBe(expectations);
    });
});
