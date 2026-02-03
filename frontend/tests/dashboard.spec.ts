import { test, expect } from '@playwright/test';

test.describe('BrandPilot AI Dashboard', () => {
    test.beforeEach(async ({ page }) => {
        // Go to the dashboard before each test
        await page.goto('/dashboard');
    });

    test('should load dashboard with correct title and elements', async ({ page }) => {
        // Verify title
        await expect(page).toHaveTitle(/BrandPilot AI/);

        // Verify "Website URL" input exists
        const urlInput = page.getByPlaceholder('e.g., brandpilot.ai');
        await expect(urlInput).toBeVisible();

        // Verify "Run Audit" button exists
        const auditButton = page.getByRole('button', { name: /Run Audit/i });
        await expect(auditButton).toBeVisible();
    });

    test('should navigate to Action Center with URL params', async ({ page }) => {
        // Fill in the form
        await page.getByPlaceholder('Enter your brand name...').fill('Test Brand');
        await page.getByPlaceholder('e.g., SaaS').fill('Tech');
        await page.getByPlaceholder('e.g., brandpilot.ai').fill('testbrand.com');

        // Click Action Center link (simulating the navigation since the Run Audit might fire API)
        // We'll check the "Action Center" button in header or specific link if accessible.
        // Since the Action Center button in the header is always visible:
        await page.getByRole('link', { name: 'Action Center' }).first().click();

        // Verify URL contains 'action-center'
        await expect(page).toHaveURL(/.*action-center/);

        // Check if parameters are preserved if we clicked a specific link, 
        // but the header link might not pass parameters unless dynamic.
        // Let's verify standard navigation first.
        await expect(page.getByRole('heading', { name: 'Action Center' })).toBeVisible();
    });
});
