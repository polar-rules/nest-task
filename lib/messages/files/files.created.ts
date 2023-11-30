import { _Chalk } from "@messages/messages.chalk.js";

/**
 * Log a message indicating that files were created.
 *
 * @param {string[]} files - An array of file names that were created.
 * @returns {void} - No return value.
 */
export function _Created(files: string[]): void {
    console.info("The following files were created:");

    for (const file of files) {
        console.info(_Chalk.gray(`- ${file}`));
    }
}
