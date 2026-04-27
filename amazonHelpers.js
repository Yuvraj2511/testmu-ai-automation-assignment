/**
 * utils/amazonHelpers.js
 * Reusable helpers for Amazon search → add-to-cart flows.
 */

/**
 * Searches Amazon for a given query and returns the page after results load.
 * @param {import('@playwright/test').Page} page
 * @param {string} searchTerm
 */
async function searchAmazon(page, searchTerm) {
  await page.goto('https://www.amazon.com', { waitUntil: 'domcontentloaded' });

  // Dismiss any geo / sign-in popups gracefully
  const dismissBtn = page.locator('[data-action="a-popover-close"]').first();
  if (await dismissBtn.isVisible({ timeout: 3000 }).catch(() => false)) {
    await dismissBtn.click();
  }

  const searchBox = page.locator('#twotabsearchtextbox');
  await searchBox.waitFor({ state: 'visible' });
  await searchBox.fill(searchTerm);
  await page.keyboard.press('Enter');
  await page.waitForLoadState('domcontentloaded');
}

/**
 * Clicks the first product result that has an accessible price.
 * Returns the product title for logging.
 * @param {import('@playwright/test').Page} page
 * @returns {Promise<string>} title of the clicked product
 */
async function clickFirstProduct(page) {
  // Wait for result items to appear
  await page.waitForSelector('[data-component-type="s-search-result"]', {
    timeout: 20000,
  });

  // Grab first result link that leads to a product page
  const firstResult = page
    .locator('[data-component-type="s-search-result"] h2 a.a-link-normal')
    .first();

  const title = (await firstResult.textContent())?.trim() ?? 'Unknown product';
  await firstResult.click();
  await page.waitForLoadState('domcontentloaded');
  return title;
}

/**
 * Reads the price from an Amazon product detail page.
 * Tries multiple price selectors in priority order.
 * @param {import('@playwright/test').Page} page
 * @returns {Promise<string>} price string, e.g. "$999.00"
 */
async function getProductPrice(page) {
  const priceSelectors = [
    '.priceToPay .a-offscreen',
    '.priceToPay',
    '#price_inside_buybox',
    '#priceblock_ourprice',
    '#priceblock_dealprice',
    '.a-price .a-offscreen',
  ];

  for (const selector of priceSelectors) {
    try {
      const el = page.locator(selector).first();
      if (await el.isVisible({ timeout: 3000 })) {
        const text = (await el.textContent())?.trim();
        if (text && text.includes('$')) return text;
      }
    } catch {
      // selector not found — try next
    }
  }
  return 'Price not found';
}

/**
 * Adds the current product to the cart (handles both direct Add-to-Cart
 * and "Buy Now"-style pages that might show a modal).
 * @param {import('@playwright/test').Page} page
 */
async function addToCart(page) {
  const addToCartBtn = page.locator('#add-to-cart-button').first();
  await addToCartBtn.waitFor({ state: 'visible', timeout: 15000 });
  await addToCartBtn.click();

  // Some pages show a "Added to Cart" confirmation layer — wait for it
  await page
    .waitForSelector('#attachDisplayAddBaseAlert, #NATC_SMART_WAGON_CONF_MSG_SUCCESS', {
      timeout: 8000,
    })
    .catch(() => {
      // Confirmation layer not always present — that's fine
    });
}

module.exports = { searchAmazon, clickFirstProduct, getProductPrice, addToCart };
