import { Transformers } from "@transformers/index.js";

import { Mocks } from "@specs/mocks/index.js";

describe("Transformers::ToUpperCase", (): void => {
    const subject = Transformers.ToUpperCase;

    beforeEach((): void => {
        Mocks.Nest.CommonLogger.mock();
    });

    afterEach((): void => {
        Mocks.Nest.CommonLogger.clean();
    });

    it("Should convert string to upper case", (): void => {
        const expectations = "HELLO MY NAME";
        const value = "HellO mY nAme";

        expect(subject(value)).toEqual(expectations);
    });

    it("Should throw error if argument is incorrect", (): void => {
        expect(() => subject(undefined as unknown as string)).toThrow();
    });
});
