import { Core } from "@core/index.js";
import { Errors } from "@errors/index.js";

describe("Core::Errors::Deprecated", (): void => {
    const Subject = Core.Errors.Deprecated;

    it("Should be an instance of Errors.Base", (): void => {
        const error = new Subject();
        expect(error).toBeInstanceOf(Errors.Base);
    });

    it("Should have the correct error message", (): void => {
        const error = new Subject();
        const expectations =
            "Task that you want to run marked as deprecated. Consider remove `deprecated` flag from `@Decorators.Task()` if you desire to run this task.";

        expect(error.message).toBe(expectations);
    });
});
