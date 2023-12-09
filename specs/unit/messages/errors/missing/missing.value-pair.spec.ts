import { Messages } from "@messages/index.js";
import { Transformers } from "@transformers/index.js";

describe("Messages::Errors::Missing::ValuePair", (): void => {
    const Subject = Messages.Errors.Missing.ValuePair;

    it("Should log error 2 times", (): void => {
        Subject("test");
        expect(console.error).toBeCalledTimes(2);
    });

    it("Should print the correct message", (): void => {
        Subject("test");
        expect(console.error).toBeCalledWith(Messages.Chalk.red("Something is wrong with named arguments!"));
    });

    it("Should call RTFM once", (): void => {
        Subject("test");
        expect(console.info).toBeCalledWith(
            Transformers.Prettify("Please, use `nest-task help` for additional information.", "white"),
        );
    });
});
