import { Patches } from "@patches/index.js";
import { Transformers } from "@transformers/index.js";

describe("Transformers::ToSnakeCase", (): void => {
    const subject: typeof Transformers.ToSnakeCase = Transformers.ToSnakeCase;

    it("Should proxy logic to Patches::String#toSnakeCase", (): void => {
        const spyOn = jest.spyOn(Patches.String.prototype, "toSnakeCase");
        const value = "Test string";

        subject(value);

        expect(spyOn).toBeCalledTimes(1);
        spyOn.mockClear();
    });
});
