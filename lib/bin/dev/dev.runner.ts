export async function _Runner(): Promise<void> {
    const command = process.argv.at(2);

    if (!command) {
        console.error("Command is missing");
        process.exit(1);
    }

    const namespaces = command.split("::");
    const namespace = namespaces.join("/");
    const moduleName = namespaces.at(-1);

    if (!moduleName) {
        console.error("Module name is missing");
        process.exit(1);
    }

    if (!namespace) {
        console.error("Namespace is missing");
        process.exit(1);
    }

    await import(`./${namespace}/${moduleName}.exec.js`);
}
