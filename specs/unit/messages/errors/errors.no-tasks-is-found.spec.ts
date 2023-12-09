import { Messages } from "@messages/index.js";

describe("Messages::Errors::NoTasksIsFound", (): void => {
    const Subject = Messages.Errors.NoTasksIsFound;

    it("Should log error 2 times when empty array is passed", (): void => {
        Subject();
        expect(console.error).toBeCalledTimes(1);
    });

    it("Should print the correct message", (): void => {
        Subject();
        expect(console.error).toBeCalledWith(Messages.Chalk.red("No tasks found!"));
    });
});
