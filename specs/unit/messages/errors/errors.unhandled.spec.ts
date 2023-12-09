import { Messages } from "@messages/index.js";

describe("Messages::Errors::Unhandled", (): void => {
    const Subject = Messages.Errors.Unhandled;

    it("Should log error 1 times when empty array is passed", (): void => {
        try {
            Subject({});
        } catch {
            expect(console.error).toBeCalledTimes(1);
        }
    });

    it("Should print the correct message", (): void => {
        try {
            Subject({});
        } catch {
            expect(console.error).toBeCalledWith(
                Messages.Chalk.red("Unhandled error occurred. The trace is available below."),
            );
        }
    });

    it("Should throw an error", (): void => {
        expect(() => Subject(new Error("Test"))).toThrow();
    });
});
