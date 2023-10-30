export class _MainAlreadyExist extends Error {
    constructor(path: string) {
        super(`File \`${path}\` already exists!`);
    }
}
