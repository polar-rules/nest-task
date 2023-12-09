import { Messages } from "@messages/index.js";

describe("Messages::Files::Updated", (): void => {
    const Subject = Messages.Files.Updated;

    it("Should log a one time when array is empty", (): void => {
        Subject([]);
        expect(console.info).toBeCalledTimes(1);
    });

    it("Should log correct amount of times when passing array with proper length", (): void => {
        Subject(["test.ts", "test-2.ts"]);
        expect(console.info).toBeCalledTimes(3);
    });

    it("Should have the correct message", (): void => {
        Subject([]);
        expect(console.info).toBeCalledWith("We updated the following files:");
    });
});
