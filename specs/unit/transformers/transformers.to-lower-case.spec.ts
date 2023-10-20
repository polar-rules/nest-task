import { Transformers } from "@transformers/index.js";

describe("Transformers::ToLowerCase", (): void => {
    const subject = Transformers.ToLowerCase;

    it("Should convert string to lower case", (): void => {
        const expectations = "hello my name";
        const value = "HellO mY nAme";

        expect(subject(value)).toEqual(expectations);
    });

    it("Should throw error if argument is incorrect", (): void => {
        expect(() => subject(undefined as unknown as string)).toThrow();
    });
});
