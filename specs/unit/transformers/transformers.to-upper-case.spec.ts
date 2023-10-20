import { Transformers } from "@transformers/index.js";

describe("Transformers::ToUpperCase", (): void => {
    const subject: typeof Transformers.ToUpperCase = Transformers.ToUpperCase;

    it("Should convert string to upper case", (): void => {
        const expectations = "HELLO MY NAME";
        const value = "HellO mY nAme";

        expect(subject(value)).toEqual(expectations);
    });

    it("Should throw error if argument is incorrect", (): void => {
        expect(() => subject(undefined as unknown as string)).toThrow();
    });
});
