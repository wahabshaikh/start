import { expect, test } from "@playwright/test";

test("renders the starter", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: /ship web and ios products/i })).toBeVisible();
  await expect(page.getByRole("button", { name: /start building/i })).toBeVisible();
});
