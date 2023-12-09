import { Messages } from "@messages/index.js";
import { Transformers } from "@transformers/index.js";

describe("Messages::Notes::UpdateTaskModule", (): void => {
    const Subject = Messages.Notes.UpdateTaskModule;

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
            Transformers.Prettify("Note: Don't forget to update `task.module.ts` file to include new runner!", "white"),
        );
    });
});
