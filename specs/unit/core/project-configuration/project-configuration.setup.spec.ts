import { Core } from "@core/index.js";

import { Mocks } from "@specs/mocks/index.js";

describe("Core::ProjectConfiguration::Setup", (): void => {
    const Subject = Core.ProjectConfiguration.Setup;

    beforeEach((): void => {
        Mocks.PathManager.projectRootMock();
    });

    afterEach((): void => {
        Mocks.PathManager.clean();
    });

    describe("#run", (): void => {
        describe("When `task` should be defined on root level", (): void => {
            xit("Should write configuration to `nest-cli.json`", async (): Promise<void> => {
                Mocks.Fs.merge(Mocks.NestCli.mockMerge(), Mocks.Templates.mockMerge());

                const subject = new Subject(Core.ProjectConfiguration.Abstractions.Enums.Conventions.KebabCase);
                await subject.run();

                const read = new Core.ProjectConfiguration.Read();
                await read.run();

                // const configuration = fs.readFile(read.configurationPath);
            });

            xit("Should write a template file", async (): Promise<void> => {});
        });

        describe("When `projects` key is present", (): void => {
            xit("Should write configuration to `nest-cli.json` ", async (): Promise<void> => {});
        });
    });
});
