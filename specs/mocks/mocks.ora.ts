import { jest } from "@jest/globals";

export namespace _Ora {
    export namespace Mocks {
        export const text = jest.fn();

        export const succeed = jest.fn();

        export const finish = jest.fn();

        export const message = jest.fn();

        export const start = jest.fn().mockReturnValue({
            text,
            succeed,
            finish,
            message,
        });

        export const defaultBehaviour = jest.fn().mockReturnValue({ start });

        export const module: jest.Mock = defaultBehaviour;
    }

    export function clean(): void {
        Mocks.module.mockClear();
    }

    jest.mock("ora", () => {
        return Mocks.module;
    });
}
