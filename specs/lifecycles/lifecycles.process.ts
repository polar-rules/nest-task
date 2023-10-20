import { Mocks } from "@specs/mocks/index.js";

export namespace _Process {
    export namespace Before {
        export namespace Each {
            export function exit(): void {
                Mocks.Process.exit();
            }
        }
    }

    export namespace After {
        export namespace Each {
            export function clean(): void {
                Mocks.Process.clean();
            }
        }
    }
}
