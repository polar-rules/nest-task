import { jest } from "@jest/globals";

import { Transformers } from "@transformers/index.js";
import { Patches } from "@patches/index.js";

describe("Transformers::ToSnakeCase", (): void => {
    let stringSpy: jest.SpiedFunction<any> | undefined;

    const subject = Transformers.ToSnakeCase;

    beforeEach((): void => {
        stringSpy = jest.spyOn(Patches.String.prototype, "toSnakeCase");
    });

    afterEach((): void => {
        stringSpy?.mockReset();
    });

    it("Should proxy logic to Patches::String#toSnakeCase", (): void => {
        const value = "Test string";

        subject(value);
        expect(stringSpy).toBeCalledTimes(1);
    });
});
