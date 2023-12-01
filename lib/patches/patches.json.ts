/**
 * Class providing JSON-related utility functions.
 *
 * @class _Json
 */
export class _Json {
    /**
     * Parses a JSON string into the specified type.
     *
     * @static
     * @template ExpectedResults - The expected type of the parsed results.
     * @param {string} string - The JSON string to parse.
     * @returns {ExpectedResults} - The parsed results of the specified type.
     */
    public static parse<ExpectedResults>(string: string): ExpectedResults {
        return JSON.parse(string);
    }
}
