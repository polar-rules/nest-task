import { Messages } from "@messages/index.js";
import { Transformers } from "@transformers/index.js";

describe("Messages::Errors::Missing::Command", (): void => {
    const Subject = Messages.Errors.Missing.Command;

    it("Should log error 1 time", (): void => {
        Subject();
        expect(console.error).toBeCalledTimes(1);
    });

    it("Should print the correct message", (): void => {
        Subject();
        expect(console.error).toBeCalledWith(
            "Incorrect arguments!",
            "You need to pass",
            Messages.Chalk.cyan("`command`"),
            "as a first argument.",
        );
    });

    it("Should call RTFM once", (): void => {
        Subject();
        expect(console.info).toBeCalledWith(
            Transformers.Prettify("Please, use `nest-task help` for additional information.", "white"),
        );
    });
});
