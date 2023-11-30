import { _Chalk } from "@messages/messages.chalk.js";

/**
 * Log an error message indicating that no tasks were found.
 * Exits the process with an error code.
 *
 * @returns {never} - Exits the process with an error code.
 */
export function _NoTasksIsFound(): never {
    console.error(_Chalk.red("No tasks found!"));
    process.exit(1);
}
