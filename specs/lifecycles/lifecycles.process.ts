import { Mocks } from "@specs/mocks/index.js";

export namespace _Process {
    export namespace Before {
        export namespace All {
            export function exit(): void {
                Mocks.Process.exit();
            }
        }
    }

    export namespace After {
        export namespace All {
            export function clean(): void {
                Mocks.Process.clean();
            }
        }
    }
}
