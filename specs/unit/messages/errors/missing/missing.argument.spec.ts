import { Messages } from "@messages/index.js";
import { Transformers } from "@transformers/index.js";

describe("Messages::Errors::Missing::Argument", (): void => {
    const Subject = Messages.Errors.Missing.Argument;

    it("Should log error 2 times when empty array is passed", (): void => {
        Subject(["test"]);
        expect(console.error).toBeCalledTimes(2);
    });

    it("Should print the correct message", (): void => {
        Subject(["test"]);
        expect(console.error).toBeCalledWith(Transformers.Prettify("Missing arguments!", "red"));
    });

    it("Should call RTFM once", (): void => {
        Subject(["test"]);
        expect(console.info).toBeCalledWith(
            Transformers.Prettify("Please, use `nest-task help` for additional information.", "white"),
        );
    });
});
