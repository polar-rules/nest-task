import { Messages } from "@messages/index.js";
import { Errors } from "@errors/index.js";

describe("Messages::Errors::Unhandled", (): void => {
    const Subject = Messages.Errors.Prettify;

    it("Should log error 1 times when empty array is passed", (): void => {
        Subject(new Errors.Base("test"));
        expect(console.error).toBeCalledTimes(1);
    });
});
