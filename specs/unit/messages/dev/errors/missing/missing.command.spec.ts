import { Messages } from "@messages/index.js";
import { Transformers } from "@transformers/index.js";

describe("Messages::Dev::Errors::Missing::Command", (): void => {
    const Subject = Messages.Dev.Errors.Missing.Command;

    it("Should call an error 1 time", (): void => {
        Subject("1");
        expect(console.error).toBeCalledTimes(1);
    });

    it("Should have a correct message", (): void => {
        Subject("1");
        expect(console.error).toBeCalledWith(
            Transformers.Prettify("Incorrect arguments! You need to pass `command` as a 1-ish argument.", "red"),
        );
    });
});
