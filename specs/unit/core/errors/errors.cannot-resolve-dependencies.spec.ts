import { Core } from "@core/index.js";
import { Errors } from "@errors/index.js";

describe("Core::Errors::CannotResolveDependencies", (): void => {
    const Subject = Core.Errors.CannotResolveDependencies;

    it("Should be an instance of Errors.Base", (): void => {
        const error = new Subject(0);
        expect(error).toBeInstanceOf(Errors.Base);
    });

    it("Should have the correct error message", (): void => {
        const index = 2;
        const error = new Subject(index);
        const expectations = `Cannot resolve dependency for \`@Runner()\` at index \`${index}\`.`;

        expect(error.message).toBe(expectations);
    });
});
