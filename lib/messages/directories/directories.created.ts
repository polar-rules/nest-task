import { _Chalk } from "@messages/messages.chalk.js";

/**
 * Log a message indicating the creation of directories.
 *
 * @param {string[]} directories - An array of directory names that were created.
 * @returns {void}
 */
export function _Created(directories: string[]): void {
    console.info("The following directories were created:");

    for (const directory of directories) {
        console.info(_Chalk.gray(`- ${directory}`));
    }
}
