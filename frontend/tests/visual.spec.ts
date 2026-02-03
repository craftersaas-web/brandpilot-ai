import { test, expect } from '@playwright/test';

test.describe('Visual Verification', () => {
    test.beforeEach(async ({ page }) => {
        // Ensure we are in a known state
        await page.goto('/dashboard');
    });

    test('capture dashboard state', async ({ page }) => {
        // Initial state
        await expect(page.getByRole('heading', { name: 'BrandPilot AI Dashboard' })).toBeVisible();
        // Wait for animations if any
        await page.waitForTimeout(1000);
        await page.screenshot({ path: 'tests/screenshots/dashboard-initial.png', fullPage: true });

        // Filled state
        await page.getByPlaceholder('Enter your brand name...').fill('BrandPilot');
        await page.getByPlaceholder('e.g., brandpilot.ai').fill('brandpilot.ai');
        // Click body to blur inputs
        await page.locator('body').click();
        await page.waitForTimeout(500);
        await page.screenshot({ path: 'tests/screenshots/dashboard-filled.png', fullPage: true });
    });

    test('capture action center state', async ({ page }) => {
        // Navigate with params directly to simulate flow
        await page.goto('/dashboard/action-center?brand=BrandPilot&website=brandpilot.ai&industry=SaaS');

        // Citation Builder (default tab)
        await expect(page.getByRole('heading', { name: 'Action Center' })).toBeVisible();
        await page.waitForTimeout(1000);
        await page.screenshot({ path: 'tests/screenshots/action-center-citation.png', fullPage: true });

        // Competitor Intel tab
        await page.getByRole('tab', { name: 'Competitor Intel' }).click();
        // Wait for content
        await expect(page.getByText('Competitive Intelligence Hub')).toBeVisible();
        await page.waitForTimeout(500);
        await page.screenshot({ path: 'tests/screenshots/action-center-competitor.png', fullPage: true });
    });
});
