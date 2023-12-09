import { Messages } from "@messages/index.js";
import { Transformers } from "@transformers/index.js";

describe("Messages::Notes::NamingConvention", (): void => {
    const Subject = Messages.Notes.NamingConvention;

    it("Should log a note without space when space is false", (): void => {
        Subject({ space: false });
        expect(console.info).toBeCalledTimes(1);
    });

    it("Should log a note with space when space is true", (): void => {
        Subject({ space: true });
        expect(console.info).toBeCalledTimes(2);
    });

    it("Should have the correct message", (): void => {
        Subject({ space: false });
        expect(console.info).toBeCalledWith(
            Transformers.Prettify(
                "Note: we will create files according to naming `convention` configuration in `nest-cli.json`.",
                "white",
            ),
        );
    });
});
