import { Transformers } from "@transformers/index.js";

import { Helpers } from "@specs/helpers/index.js";

describe("_Prettify", (): void => {
    const Subject = Transformers.Prettify;

    it("Should return prettified text with applied colorization for plain text", (): void => {
        const text = "example";
        const colour = "white";
        const prettifiedText = Subject(text, colour);

        expect(Helpers.Prettify.removeANSICodes(prettifiedText)).toEqual(text);
    });

    it("Should return prettified text with different colour for text in ` brackets", (): void => {
        const text = "const `example`";
        const colour = "white";
        const prettifiedText = Subject(text, colour);

        expect(Helpers.Prettify.removeANSICodes(prettifiedText)).toEqual(text);
    });

    it("Should throw an error if the prettified message is empty", (): void => {
        const text = "";
        const colour = "white";

        expect(() => Subject(text, colour)).toThrow(Transformers.Errors.StringOrRegexIsWrong);
    });

    it("Should not throw an error if another colour is used", (): void => {
        const text = "Text";
        const colour = "purple";

        expect(() => Subject(text, colour as unknown as any)).not.toThrow(Transformers.Errors.StringOrRegexIsWrong);
    });
});
