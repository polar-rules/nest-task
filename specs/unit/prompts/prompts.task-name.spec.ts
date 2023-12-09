import { Prompts } from "@prompts/index.js";

import { Mocks } from "@specs/mocks/index.js";

describe("Prompts::TaskName", (): void => {
    const Subject = Prompts.TaskName;

    afterEach((): void => {
        Mocks.Inquirer.clean();
    });

    describe("#run", (): void => {
        it("Should prompt the task name", async (): Promise<void> => {
            Mocks.Inquirer.mock({});

            const subject = new Subject();

            await subject.run();

            expect(Mocks.Inquirer.spyOn).toBeCalledWith({
                name: "taskName",
                message: "What is the task name?",
                type: "input",
            });
        });

        it("Should prompt the user enter the task name", async (): Promise<void> => {
            const expectations: Prompts.Types.TaskName.Prompt = { taskName: "ExampleTask" };

            Mocks.Inquirer.mock(expectations);

            const subject = new Subject();

            await subject.run();

            expect(subject.results).toEqual(expectations.taskName);
        });
    });
});
