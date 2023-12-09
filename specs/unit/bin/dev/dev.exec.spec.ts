describe("Bin::Dev::Exec", (): void => {
    it("Should call Runner", async (): Promise<void> => {
        delete process.argv[2];
        await import("@bin/dev/dev.exec.js");

        expect(process.exit).toBeCalledTimes(1);
    });
});
