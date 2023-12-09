import { jest } from "@jest/globals";

import Inquirer, { Answers } from "inquirer";

export namespace _Inquirer {
    export let spyOn: jest.SpiedFunction<any> | undefined;

    export function mock(answer: Answers): void {
        spyOn = <any>jest.spyOn(Inquirer, "prompt").mockImplementation((_question: any) => {
            return Promise.resolve(answer);
        });
    }

    export function clean(): void {
        spyOn?.mockClear();
    }
}
