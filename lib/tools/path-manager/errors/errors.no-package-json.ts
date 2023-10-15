export class _NoPackageJson extends Error {
    constructor() {
        super("PathManager | No `package.json` was found!");
    }
}
