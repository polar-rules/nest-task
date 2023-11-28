import { jest } from "@jest/globals";

import { NestFactory } from "@nestjs/core";
import { Logger } from "@nestjs/common";

export namespace _Nest {
    export namespace CommonLogger {
        export let spyOn: jest.SpiedFunction<any>;

        export function mock(): void {
            spyOn = jest.spyOn(Logger.prototype, "log");
        }

        export function clean(): void {
            spyOn.mockRestore();
        }
    }

    export namespace Create {
        export let spyOn: jest.SpiedFunction<any>;

        export function mock(): void {
            spyOn = <jest.SpiedFunction<any>>jest.spyOn(NestFactory, "create").mockReturnValue(<any>{
                get: (Class: any) => new Class(),
            });
        }

        export function clean(): void {
            spyOn.mockRestore();
        }
    }
}
