describe("Atomic Components Index Exports", () => {
  it("exports BackButton correctly", async () => {
    const { BackButton } = await import("./BackButton");
    expect(BackButton).toBeDefined();
    expect(typeof BackButton).toBe("function");
  });

  it("exports Button correctly", async () => {
    const { Button } = await import("./Button");
    expect(Button).toBeDefined();
    expect(typeof Button).toBe("function");
  });

  it("exports CardField correctly", async () => {
    const { CardField } = await import("./CardField");
    expect(CardField).toBeDefined();
    expect(typeof CardField).toBe("function");
  });

  it("exports Heading correctly", async () => {
    const { Heading } = await import("./Heading");
    expect(Heading).toBeDefined();
    expect(typeof Heading).toBe("function");
  });

  it("exports Icon components correctly", async () => {
    const icons = await import("./Icon");

    expect(icons.AlertIcon).toBeDefined();
    expect(icons.ChartIcon).toBeDefined();
    expect(icons.CloseIcon).toBeDefined();
    expect(icons.GridIcon).toBeDefined();
    expect(icons.PaletteIcon).toBeDefined();
    expect(icons.TableIcon).toBeDefined();
    expect(icons.UsersIcon).toBeDefined();
    expect(typeof icons.AlertIcon).toBe("function");
    expect(typeof icons.ChartIcon).toBe("function");
    expect(typeof icons.CloseIcon).toBe("function");
    expect(typeof icons.GridIcon).toBe("function");
    expect(typeof icons.PaletteIcon).toBe("function");
    expect(typeof icons.TableIcon).toBe("function");
    expect(typeof icons.UsersIcon).toBe("function");
  });

  it("exports Input correctly", async () => {
    const { Input } = await import("./Input");
    expect(Input).toBeDefined();
    expect(typeof Input).toBe("function");
  });

  it("exports PageHead correctly", async () => {
    const { PageHead } = await import("./PageHead");
    expect(PageHead).toBeDefined();
    expect(typeof PageHead).toBe("function");
  });

  it("exports Spinner correctly", async () => {
    const { Spinner } = await import("./Spinner");
    expect(Spinner).toBeDefined();
    expect(typeof Spinner).toBe("function");
  });

  it("exports TableCell correctly", async () => {
    const { TableCell } = await import("./TableCell");
    expect(TableCell).toBeDefined();
    expect(typeof TableCell).toBe("function");
  });
});
