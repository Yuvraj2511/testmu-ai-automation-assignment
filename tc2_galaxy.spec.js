/**
 * tests/tc2_galaxy.spec.js
 * Test Case 2 — Search for a Samsung Galaxy device, add to cart, print price.
 */

const { test, expect } = require('@playwright/test');
const {
  searchAmazon,
  clickFirstProduct,
  getProductPrice,
  addToCart,
} = require('../utils/amazonHelpers');

test('TC2 — Search Samsung Galaxy, add to cart, print price', async ({ page }) => {
  const SEARCH_TERM = 'Samsung Galaxy S24';

  console.log('\n========================================');
  console.log('  TEST CASE 2 — Samsung Galaxy');
  console.log('========================================');

  // Step 1: Search Amazon
  console.log(`[TC2] Navigating to Amazon and searching for: "${SEARCH_TERM}"`);
  await searchAmazon(page, SEARCH_TERM);

  // Step 2: Open first product
  console.log('[TC2] Clicking first product result...');
  const productTitle = await clickFirstProduct(page);
  console.log(`[TC2] Product selected: ${productTitle}`);

  // Step 3: Read price BEFORE adding to cart
  const price = await getProductPrice(page);
  console.log(`\n  💰 [TC2] Galaxy Price: ${price}\n`);

  // Step 4: Add to cart
  console.log('[TC2] Adding product to cart...');
  await addToCart(page);
  console.log('[TC2] ✅ Product successfully added to cart.');

  // Basic assertion — price was found
  expect(price).not.toBe('Price not found');
  console.log('========================================\n');
});
