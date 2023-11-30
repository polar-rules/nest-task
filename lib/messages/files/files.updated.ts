import { _Chalk } from "@messages/messages.chalk.js";

/**
 * Log a message indicating that files were updated.
 *
 * @param {string[]} files - An array of file names that were updated.
 * @returns {void} - No return value.
 */
export function _Updated(files: string[]): void {
    console.info("We updated the following files:");

    for (const file of files) {
        console.info(_Chalk.gray(`- ${file}`));
    }
}
