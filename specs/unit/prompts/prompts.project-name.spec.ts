import { Prompts } from "@prompts/index.js";

import { Mocks } from "@specs/mocks/index.js";

describe("Prompts::ProjectName", (): void => {
    const Subject = Prompts.ProjectName;

    beforeEach((): void => {
        Mocks.FindPackageJson.mock(Mocks.FindPackageJson.projectRoot);
        Mocks.Tools.PathManager.findPackageJsonMock(Mocks.Tools.PathManager.projectRoot);
        Mocks.Fs.merge(Mocks.Core.ProjectConfiguration.Read.fsMerge());
    });

    afterEach((): void => {
        Mocks.Core.ProjectConfiguration.Read.clean();
        Mocks.Inquirer.clean();
        Mocks.Tools.PathManager.clean();
        Mocks.Patches.Json.clean();
    });

    describe("#run", (): void => {
        it("Should return undefined if there are no projects in the configuration", async (): Promise<void> => {
            Mocks.Patches.Json.mock(Mocks.NestCli.main);

            const subject = new Subject();

            await subject.run();

            expect(subject.results).toBeUndefined();
        });

        it("Should prompt the project name", async (): Promise<void> => {
            Mocks.Inquirer.mock({});
            Mocks.Patches.Json.mock(Mocks.NestCli.project);

            const subject = new Subject();

            await subject.run();

            expect(Mocks.Inquirer.spyOn).toBeCalledWith({
                name: "projectName",
                message: "Pick a project",
                type: "list",
                choices: Object.keys(Mocks.NestCli.project["projects"]),
            });
        });

        it("Should prompt the user to choose a project and set the results", async (): Promise<void> => {
            const expectations: Prompts.Types.ProjectName.Prompt = {
                projectName: <string>Object.keys(Mocks.NestCli.project["projects"]).at(0),
            };

            Mocks.Patches.Json.mock(Mocks.NestCli.project);
            Mocks.Inquirer.mock(expectations);

            const subject = new Subject();

            await subject.run();

            expect(subject.results).toEqual(expectations.projectName);
        });
    });
});
