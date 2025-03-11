import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
  await page.evaluate(() => localStorage.removeItem("gorest-blog-post"));
});

test.describe("Before logging in", () => {
  test("Has title", async ({ page }) => {
    await expect(page).toHaveTitle(/Gorest Blog Posts/);
  });

  test("Should show error message when API token is invalid", async ({
    page,
  }) => {
    await page.getByPlaceholder("Your name").fill("Abdul");
    await page.getByPlaceholder("Your API token").fill("wrong-token-example");
    await page.getByRole("button", { name: "Submit" }).click();

    await expect(
      page.getByText("Invalid API token. Please check and try again!"),
    ).toBeVisible();
  });
});
