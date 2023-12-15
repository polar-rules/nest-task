describe("Bin::Exec", (): void => {
    it("Should call Runner", async (): Promise<void> => {
        await import("@bin/bin.exec.js");

        expect(process.exit).toBeCalled();
    });
});
