import { Messages } from "@messages/index.js";
import { Transformers } from "@transformers/index.js";

describe("Messages::Prettify", (): void => {
    const Subject = Messages.Prettify;

    it("Should call info 1 times ", (): void => {
        Subject(" ");
        expect(console.info).toBeCalledTimes(1);
    });

    it("Should print a correct message", (): void => {
        Subject("test");
        expect(console.info).toBeCalledWith(Transformers.Prettify("test", "white"));
    });
});
