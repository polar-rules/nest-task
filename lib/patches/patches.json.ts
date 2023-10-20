export class _Json {
    public static parse<ExpectedResults>(string: string): ExpectedResults {
        return JSON.parse(string);
    }
}
