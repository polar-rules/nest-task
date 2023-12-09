import { Messages } from "@messages/index.js";

describe("Messages::FoundTasks", (): void => {
    const Subject = Messages.FoundTasks;

    it("Should call info 1 times when empty arrays is passed", (): void => {
        Subject([]);
        expect(console.info).toBeCalledTimes(1);
    });

    it("Should have a correct message", (): void => {
        Subject([]);
        expect(console.info).toBeCalledWith("We found the followings tasks:");
    });

    it("Should call info 3 times when task is passed", (): void => {
        Subject([{ name: "Test", description: "Test" }]);
        expect(console.info).toBeCalledTimes(3);
    });

    it("Should print arguments", (): void => {
        Subject([{ name: "Test", description: "Test", args: [{ name: "Test", type: "string" }] }]);
        expect(console.info).toBeCalledTimes(5);
    });
});
