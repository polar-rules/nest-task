import { Messages } from "@messages/index.js";

describe("Messages::Files::Created", (): void => {
    const Subject = Messages.Files.Created;

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
        expect(console.info).toBeCalledWith("The following files were created:");
    });
});
