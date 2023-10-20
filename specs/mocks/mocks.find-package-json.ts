export namespace _FindPackageJson {
    export const projectRoot: Readonly<string> = "test-project";

    export const projectSubFolder: Readonly<string> = `${projectRoot}/nestjs-task`;

    export namespace Mocks {
        export const defaultBehaviour = {
            next: jest.fn().mockReturnValue({
                value: {
                    __path: projectSubFolder,
                },
            }),
        };

        export const unableToFindPackageJsonBehaviour = {
            next: jest.fn().mockReturnValue({
                value: undefined,
            }),
        };

        export const module: jest.Mock = jest.fn().mockReturnValue(defaultBehaviour);
    }

    export function clean(): void {
        Mocks.module.mockClear();
        jest.clearAllMocks();
    }

    jest.mock("find-package-json", () => {
        return {
            __esModule: true,
            default: Mocks.module,
        };
    });
}
