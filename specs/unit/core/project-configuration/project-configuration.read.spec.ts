import * as path from "path";

import { Core } from "@core/index.js";
import { Mocks } from "@specs/mocks/index.js";
import { Configs } from "@specs/configs/index.js";

describe("Core::ProjectConfiguration::Read", (): void => {
    const Subject = Core.ProjectConfiguration.Read;

    beforeEach((): void => {
        Mocks.Tools.PathManager.projectRootMock();
    });

    afterEach((): void => {
        Mocks.Tools.PathManager.clean();
    });

    describe("#configurationPath", (): void => {
        it("Should return path to `nest-cli.json`", (): void => {
            const subject = new Subject();

            expect(
                subject.configurationPath.endsWith(path.join(Configs.Constants.Folders.tmp, "nest-cli.json")),
            ).toBeTruthy();
        });
    });

    describe("#taskConfiguration", (): void => {
        it("Should return task configuration", async (): Promise<void> => {
            const subject = new Subject();

            Mocks.Fs.merge({
                [subject.configurationPath]: JSON.stringify(Mocks.NestCli.mainWithTask),
            });

            await subject.run();
            expect(subject.taskConfiguration).toEqual(Mocks.NestCli.mainWithTask["task"]);
        });
    });

    describe("#resolveConfiguration", (): void => {
        it("Should resolve configuration by `projectName`", async (): Promise<void> => {
            const subject = new Subject("api");

            Mocks.Fs.merge({
                [subject.configurationPath]: JSON.stringify(Mocks.NestCli.projectWithTask),
            });

            await subject.run();

            expect(subject.resolveConfiguration).toEqual(Mocks.NestCli.projectWithTask["projects"]["api"]);
        });

        it("Should resolve configuration to root when `projectName` is missing", async (): Promise<void> => {
            const subject = new Subject();

            Mocks.Fs.merge({
                [subject.configurationPath]: JSON.stringify(Mocks.NestCli.mainWithTask),
            });

            await subject.run();

            expect(subject.resolveConfiguration).toEqual(Mocks.NestCli.mainWithTask);
        });

        it("Should throw error when `project` key is present but `projectName` is missing", async (): Promise<void> => {
            const subject = new Subject();

            Mocks.Fs.merge({
                [subject.configurationPath]: JSON.stringify(Mocks.NestCli.projectWithTask),
            });

            await subject.run();

            expect(() => subject.resolveConfiguration).toThrow(Core.ProjectConfiguration.Errors.ProjectNameIsRequired);
        });

        it("Should throw an error if `projectName` is incorrect", async (): Promise<void> => {
            const subject = new Subject("example");

            Mocks.Fs.merge({
                [subject.configurationPath]: JSON.stringify(Mocks.NestCli.projectWithTask),
            });

            await subject.run();

            expect(() => subject.resolveConfiguration).toThrow(
                Core.ProjectConfiguration.Errors.MissingProjectConfiguration,
            );
        });
    });

    describe("#run", (): void => {
        it("Should read `nest-cli.json`", async (): Promise<void> => {
            const subject = new Subject();

            Mocks.Fs.merge({
                [subject.configurationPath]: JSON.stringify(Mocks.NestCli.mainWithTask),
            });

            await subject.run();

            expect(subject.configuration).toEqual(Mocks.NestCli.mainWithTask);
        });

        it("Should throw an error when `nest-cli.json` is not found", async (): Promise<void> => {
            Mocks.Fs.merge({});

            const subject = new Subject();

            await expect(() => subject.run()).rejects.toThrow(Core.ProjectConfiguration.Errors.MissingNestCli);
        });
    });
});
