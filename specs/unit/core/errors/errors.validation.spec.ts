import { Core } from "@core/index.js";
import { Errors } from "@errors/index.js";

describe("Core::Errors::Validation", (): void => {
    const Subject = Core.Errors.Validation;

    it("Should be an instance of Errors.Base", (): void => {
        const validationError = new Subject({});
        expect(validationError).toBeInstanceOf(Errors.Base);
    });

    it("Should have the correct error message with empty validation issues", (): void => {
        const validationError = new Subject({});
        const expectedMessage = "We located the following validation issues.";

        expect(validationError.message).toBe(expectedMessage);
    });

    it("Should have the correct error message with validation issues", (): void => {
        const validationIssues = {
            field1: ["Error1", "Error2"],
            field2: ["Error3"],
        };

        const validationError = new Subject(validationIssues);

        const expectedMessage =
            "We located the following validation issues.\n  field1:\n    - Error1\n    - Error2\n  field2:\n    - Error3";

        expect(validationError.message).toBe(expectedMessage);
    });
});
