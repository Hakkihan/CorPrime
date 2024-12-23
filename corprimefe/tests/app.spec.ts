import { test, expect } from '@playwright/test';

test.describe('App Component', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the page where the app is running
    await page.goto('/');
  });

  test('should render the app and elements correctly', async ({ page }) => {
    // Verify the page loads correctly
    await expect(page.locator('h1')).toHaveText('Incoming Ticker Value of Price');
    
    // Verify the "Subscribe to Ticker" button is present
    const subscribeButton = page.locator('button');
    await expect(subscribeButton).toHaveText('Subscribe to Ticker');
  });

  test('should toggle subscription on button click', async ({ page }) => {
    const subscribeButton = page.locator('button');

    // Initially, the button text should be "Subscribe to Ticker"
    await expect(subscribeButton).toHaveText('Subscribe to Ticker');

    // Click the button to subscribe
    await subscribeButton.click();
    await expect(subscribeButton).toHaveText('Unsubscribe from Ticker');

    // Click again to unsubscribe
    await subscribeButton.click();
    await expect(subscribeButton).toHaveText('Subscribe to Ticker');
  });

//   test('should display Bitcoin price when received', async ({ page }) => {
//     // Wait for the Bitcoin price element to appear and check its content
//     const bitcoinPrice = page.locator('div', { hasText: 'Current Bitcoin Price' });

//     // Assuming the Bitcoin price is available in the page DOM after a socket connection:
//     await expect(bitcoinPrice).toBeVisible();
//     await expect(bitcoinPrice).toContainText('Current Bitcoin Price:');
//   });

  test('should update the chart dynamically with new data', async ({ page }) => {
    // We need to check if the chart gets updated when new data arrives
    const initialChartData = await page.locator('canvas').screenshot();
    
    // Wait for some time or trigger the WebSocket to push data
    await page.waitForTimeout(5000); // Adjust time based on your app's WebSocket interval
    
    const updatedChartData = await page.locator('canvas').screenshot();
    
    // The screenshot should differ as the chart data is updated
    expect(initialChartData).not.toEqual(updatedChartData);
  });
});
