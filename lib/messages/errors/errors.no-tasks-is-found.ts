import { _Chalk } from "@messages/messages.chalk.js";

export function _NoTasksIsFound(): never {
    console.error(_Chalk.red("No tasks found!"));
    process.exit(1);
}
