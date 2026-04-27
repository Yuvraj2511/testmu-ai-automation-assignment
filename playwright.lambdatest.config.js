/**
 * playwright.lambdatest.config.js
 * Bonus: Run both test cases in parallel on LambdaTest Cloud.
 *
 * Prerequisites:
 *   export LT_USERNAME="your_lambdatest_username"
 *   export LT_ACCESS_KEY="your_lambdatest_access_key"
 *
 * Run with:
 *   npx playwright test --config=playwright.lambdatest.config.js
 */

// @ts-check
const { defineConfig } = require('@playwright/test');

const LT_USERNAME = process.env.LT_USERNAME || 'YOUR_LT_USERNAME';
const LT_ACCESS_KEY = process.env.LT_ACCESS_KEY || 'YOUR_LT_ACCESS_KEY';

const capabilities = {
  browserName: 'Chrome',
  browserVersion: 'latest',
  'LT:Options': {
    platform: 'Windows 11',
    build: 'Amazon Automation — LambdaTest',
    name: 'TC1 & TC2 Parallel',
    user: LT_USERNAME,
    accessKey: LT_ACCESS_KEY,
    network: true,
    video: true,
    console: true,
    tunnel: false,
  },
};

module.exports = defineConfig({
  testDir: './tests',
  timeout: 90 * 1000,
  retries: 1,

  // Parallel execution on LambdaTest cloud
  fullyParallel: true,
  workers: 2,

  reporter: [['html', { open: 'never' }], ['list']],

  use: {
    headless: false, // LambdaTest manages the browser; keep false
    connectOptions: {
      wsEndpoint: `wss://cdp.lambdatest.com/playwright?capabilities=${encodeURIComponent(
        JSON.stringify(capabilities)
      )}`,
    },
    userAgent:
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 ' +
      '(KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
    extraHTTPHeaders: {
      'Accept-Language': 'en-US,en;q=0.9',
    },
    actionTimeout: 20000,
    navigationTimeout: 40000,
  },
});
