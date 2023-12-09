import { Messages } from "@messages/index.js";

describe("Messages::SetupComplete", (): void => {
    const Subject = Messages.SetupComplete;

    it("Should print empty space in the end ", (): void => {
        Subject({ space: true });
        expect(console.info).toBeCalledWith("");
    });

    it("Should print a correct message", (): void => {
        Subject({ space: false });
        expect(console.info).toBeCalledWith(Messages.Chalk.green("Your projects setup is completed!"));
    });
});
