import * as Ora from "ora";

/**
 * Wrapper class for the "ora" library, providing loading message functionality.
 *
 * @class _Ora
 */
export class _Ora {
    private ora!: Ora.Ora;

    /**
     * Gets the Ora instance, handling both CommonJS and ES module imports.
     *
     * @private
     * @type {Ora.OraLike}
     */
    private get Ora(): Ora.OraLike {
        return typeof Ora === "function" ? Ora : (<Ora.Default>Ora).default;
    }

    /**
     * Starts a loading message with the specified text.
     *
     * @public
     * @param {string} text - The text to display with the loading spinner.
     * @returns {void}
     */
    public start(text: string): void {
        this.ora = this.Ora({ text }).start();
    }

    /**
     * Updates the loading message text.
     *
     * @public
     * @param {string} text - The new text for the loading message.
     * @returns {void}
     */
    public message(text: string): void {
        this.ora.text = text;
    }

    /**
     * Marks the loading message as successful and stops the spinner.
     *
     * @public
     * @param {string} text - The final text to display on success.
     * @returns {void}
     */
    public finish(text: string): void {
        this.ora.succeed(text);
    }
}
