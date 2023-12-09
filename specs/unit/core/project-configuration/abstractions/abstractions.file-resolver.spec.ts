import { Core } from "@core/index.js";

describe("Core::ProjectConfiguration::Abstractions::FileResolver", (): void => {
    class Subject extends Core.ProjectConfiguration.Abstractions.FileResolver {
        public get path(): string {
            return "/path/to/resolved/file";
        }

        public get directory(): string {
            return "/path/to/resolved/directory";
        }
    }

    describe("#task", (): void => {
        it("Should have a constructor that sets the task property", (): void => {
            const fileResolver = new Subject(<any>{});
            expect(fileResolver["task"]).toEqual(<any>{});
        });
    });
});
