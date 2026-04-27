/**
 * tests/tc1_iphone.spec.js
 * Test Case 1 — Search for an iPhone, add to cart, print price.
 */

const { test, expect } = require('@playwright/test');
const {
  searchAmazon,
  clickFirstProduct,
  getProductPrice,
  addToCart,
} = require('../utils/amazonHelpers');

test('TC1 — Search iPhone, add to cart, print price', async ({ page }) => {
  const SEARCH_TERM = 'iPhone 15';

  console.log('\n========================================');
  console.log('  TEST CASE 1 — iPhone');
  console.log('========================================');

  // Step 1: Search Amazon
  console.log(`[TC1] Navigating to Amazon and searching for: "${SEARCH_TERM}"`);
  await searchAmazon(page, SEARCH_TERM);

  // Step 2: Open first product
  console.log('[TC1] Clicking first product result...');
  const productTitle = await clickFirstProduct(page);
  console.log(`[TC1] Product selected: ${productTitle}`);

  // Step 3: Read price BEFORE adding to cart (detail page has most reliable price)
  const price = await getProductPrice(page);
  console.log(`\n  💰 [TC1] iPhone Price: ${price}\n`);

  // Step 4: Add to cart
  console.log('[TC1] Adding product to cart...');
  await addToCart(page);
  console.log('[TC1] ✅ Product successfully added to cart.');

  // Basic assertion — price was found
  expect(price).not.toBe('Price not found');
  console.log('========================================\n');
});
