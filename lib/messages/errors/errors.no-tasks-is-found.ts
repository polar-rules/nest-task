import { _Chalk } from "@messages/messages.chalk.js";

/**
 * Log an error message indicating that no tasks were found.
 * Exits the process with an error code.
 *
 * @returns {void} - Exits the process with an error code.
 */
export function _NoTasksIsFound(): void {
    console.error(_Chalk.red("No tasks found!"));
}
