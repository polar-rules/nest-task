import { Mocks } from "@specs/mocks/index.js";

export namespace _Console {
    export namespace Before {
        export namespace Each {
            export function global(): void {
                Mocks.Console.mock();
            }
        }
    }

    export namespace After {
        export namespace Each {
            export function clean(): void {
                Mocks.Console.clean();
            }
        }
    }
}
