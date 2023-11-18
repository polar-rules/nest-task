import { _Chalk } from "@messages/messages.chalk.js";

export function _Unhandled(error: unknown): never {
    console.error(_Chalk.red("Unhandled error occurred. The trace is available below."));

    throw error;
}
