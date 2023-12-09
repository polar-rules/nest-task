import { Messages } from "@messages/index.js";
import { Transformers } from "@transformers/index.js";

describe("Messages::Rtfm", (): void => {
    const Subject = Messages.Rtfm;

    it("Should call print empty line in the beginning", (): void => {
        Subject({ before: true, after: false });
        expect(console.info).toHaveBeenNthCalledWith(1, "");
    });

    it("Should call print empty line in the end", (): void => {
        Subject({ before: false, after: true });
        expect(console.info).toHaveBeenNthCalledWith(2, "");
    });

    it("Should print correct message", (): void => {
        Subject({ before: false, after: false });
        expect(console.info).toBeCalledWith(
            Transformers.Prettify("Please, use `nest-task help` for additional information.", "white"),
        );
    });
});
