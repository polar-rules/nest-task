import { Errors } from "@errors/index.js";

describe("Errors::Base", (): void => {
    const Subject = Errors.Base;

    it("Should be an instance of Error", (): void => {
        const error = new Subject("Custom error message");
        expect(error).toBeInstanceOf(Error);
    });

    it("Should have the correct error message", (): void => {
        const errorMessage = "Custom error message";
        const error = new Subject(errorMessage);

        expect(error.message).toBe(errorMessage);
    });

    describe("#custom", (): void => {
        it("Should have custom property set to true", (): void => {
            const error = new Subject("Custom error message");
            expect(error.custom).toBe(true);
        });
    });
});
