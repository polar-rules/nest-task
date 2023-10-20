export namespace _Ora {
    export namespace Mocks {
        export const text = jest.fn();

        export const succeed = jest.fn();

        export const start = jest.fn().mockReturnValue({
            text,
            succeed,
        });

        export const defaultBehaviour = jest.fn().mockReturnValue({ start });

        export const module: jest.Mock = defaultBehaviour;
    }

    export function clean(): void {
        Mocks.module.mockClear();
    }

    jest.mock("ora", () => {
        return {
            __esModule: true,
            default: Mocks.module,
        };
    });
}
