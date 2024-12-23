import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests', // Specify where your tests are located
  timeout: 30000, // Timeout for each test in milliseconds
  expect: {
    timeout: 5000, // Timeout for the expect assertions
  },
  webServer: {
    command: 'npm run dev', // Command to start the Vite development server
    port: 5173, // Port where your Vite app is running
    reuseExistingServer: !process.env.CI, // Reuse the server when not running in CI
  },
  use: {
    baseURL: 'http://localhost:5173', // The base URL for your tests (adjust if different)
    browserName: 'chromium', // Default browser to use (can be 'firefox' or 'webkit' too)
    headless: true, // Set to false to run tests in a visible browser window (for debugging)
  },
});
