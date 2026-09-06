import { test, expect, openAdminShell, adminNav } from './helpers/admin-fixtures';

test('operator journey: dashboard, products, order detail', async ({ page }) => {
  await openAdminShell(page);

  await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
  await expect(page.getByLabel('Period')).toBeVisible();
  await expect(page.getByText('Needs attention')).toBeVisible({
    timeout: 15_000,
  });

  await adminNav(page).getByRole('link', { name: 'Products', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'Products' })).toBeVisible({
    timeout: 15_000,
  });

  const editLink = page.getByRole('link', { name: 'Edit' }).first();
  await expect(editLink).toBeVisible({ timeout: 15_000 });
  await editLink.click();
  await expect(page).toHaveURL(/\/products\/\d+\/edit/);
  await expect(page.getByRole('heading', { name: 'Edit product' })).toBeVisible();

  await adminNav(page).getByRole('link', { name: 'Orders', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'Orders' })).toBeVisible({
    timeout: 15_000,
  });

  const viewLink = page.getByRole('link', { name: 'View' }).first();
  await expect(viewLink).toBeVisible({ timeout: 15_000 });
  await viewLink.click();
  await expect(page).toHaveURL(/\/orders\/\d+/);
  await expect(page.getByRole('heading', { name: 'Status actions' })).toBeVisible({
    timeout: 15_000,
  });
});
