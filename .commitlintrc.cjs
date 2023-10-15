const childProcess = require("child_process");

module.exports = {
    plugins: ["commitlint-plugin-function-rules"],
    rules: {
        "function-rules/subject-case": [
            2,
            "always",
            (parsed) => {
                const regex = /^(?:\[WiP\]\s)?\[\#\d+\]\s(?=[A-Z])\S.*$/;
                const match = parsed.header.match(regex);

                const branchName = childProcess.execSync("git rev-parse --abbrev-ref HEAD").toString().trim();
                const taskNumber = branchName.split("-")[0];

                function okMessage() {
                    console.info("\x1b[32m", "Git commit messages is OK.", "\x1b[0m", "\n");
                    process.exit(0);
                }

                if (parsed.header.toLowerCase().includes("merge")) {
                    console.info("Merge detected. Skipping...");
                    process.exit(0);
                }

                if (match && match[0] === parsed.header) {
                    if (taskNumber.includes("HEAD")) {
                        okMessage();
                    }

                    if (parsed.header.includes(taskNumber)) {
                        okMessage();
                    }
                }

                console.error(
                    `Commit message should match pattern ${regex}. For example: "[#10] Added dragons" or "[WiP] [#10] Added wings to dragon".`,
                );
                process.exit(1);
            },
        ],
    },
};
