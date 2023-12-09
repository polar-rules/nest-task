import { Errors } from "@errors/index.js";
import { Transformers } from "@transformers/index.js";

describe("Transformers::Errors::StringOrRegexIsWrong", (): void => {
    const Subject = Transformers.Errors.StringOrRegexIsWrong;

    it("Should be an instance of Error", (): void => {
        const subject = new Subject();

        expect(subject).toBeInstanceOf(Errors.Base);
    });

    it('Should have a message property set to "There is something wrong with Regex."', (): void => {
        const expectations = "There is something wrong with Regex.";
        const subject = new Subject();

        expect(subject.message).toBe(expectations);
    });
});
