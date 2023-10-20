import { Mocks } from "@specs/mocks/index.js";

export namespace _Fs {
    export namespace After {
        export namespace Each {
            export function clean(): void {
                Mocks.Fs.clean();
            }
        }
    }
}
