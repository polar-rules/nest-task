import { Messages } from "@messages/index.js";
import { Transformers } from "@transformers/index.js";

describe("Messages::Errors::Missing::Arguments", (): void => {
    const Subject = Messages.Errors.Missing.Arguments;

    it("Should log error 1 times when empty array is passed", (): void => {
        Subject();
        expect(console.error).toBeCalledTimes(1);
    });

    it("Should print the correct message", (): void => {
        Subject();
        expect(console.error).toBeCalledWith(
            Messages.Chalk.red("Missing arguments. Please use `nest-task help` for more information"),
        );
    });

    it("Should call RTFM once", (): void => {
        Subject();
        expect(console.info).toBeCalledWith(
            Transformers.Prettify("Please, use `nest-task help` for additional information.", "white"),
        );
    });
});
