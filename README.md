# 🛒 Amazon Automation — LambdaTest CE Intern Assignment

Automated test cases for searching products on Amazon, adding them to the cart, and printing prices to the console. Built with **Playwright** (JavaScript) with full **parallel execution** support.

---

## 📋 Test Cases

| # | Description | Search Term |
|---|-------------|-------------|
| TC1 | Search iPhone → Add to cart → Print price | `iPhone 15` |
| TC2 | Search Galaxy → Add to cart → Print price | `Samsung Galaxy S24` |

Both test cases run **in parallel** (2 workers) by default.

---

## 🗂️ Project Structure

```
amazon-automation/
├── tests/
│   ├── tc1_iphone.spec.js          # Test Case 1 — iPhone
│   └── tc2_galaxy.spec.js          # Test Case 2 — Galaxy
├── utils/
│   └── amazonHelpers.js            # Shared search / cart helpers
├── playwright.config.js            # Local parallel config
├── playwright.lambdatest.config.js # LambdaTest cloud config (Bonus)
├── package.json
└── README.md
```

---

## ⚙️ Prerequisites

- **Node.js** v18 or above
- **npm** v8 or above

---

## 🚀 Setup & Run

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/amazon-automation.git
cd amazon-automation
```

### 2. Install dependencies

```bash
npm install
```

### 3. Install Playwright browsers

```bash
npm run install:browsers
# or: npx playwright install chromium
```

### 4. Run both test cases in parallel (headless)

```bash
npm test
```

### 5. Run in headed mode (watch the browser)

```bash
npm run test:headed
```

### 6. View HTML test report

```bash
npm run test:report
```

---

## 🔀 Parallel Execution

Parallel execution is configured in `playwright.config.js`:

```js
fullyParallel: true,
workers: 2,          // TC1 and TC2 run simultaneously
```

Both test files are independent specs, so Playwright runs them concurrently on separate browser contexts.

---

## ☁️ Bonus: Run on LambdaTest Cloud

### 1. Sign up at [LambdaTest.com](https://www.lambdatest.com)

### 2. Get your credentials from the LambdaTest dashboard

### 3. Export your credentials

```bash
export LT_USERNAME="your_lambdatest_username"
export LT_ACCESS_KEY="your_lambdatest_access_key"
```

On Windows (PowerShell):
```powershell
$env:LT_USERNAME="your_lambdatest_username"
$env:LT_ACCESS_KEY="your_lambdatest_access_key"
```

### 4. Run on LambdaTest

```bash
npm run test:lambdatest
```

Tests run in parallel on **Windows 11 + Chrome (latest)** on LambdaTest infrastructure. Results, videos, and logs are available on your LambdaTest dashboard.

---

## 🖥️ Sample Console Output

```
========================================
  TEST CASE 1 — iPhone
========================================
[TC1] Navigating to Amazon and searching for: "iPhone 15"
[TC1] Clicking first product result...
[TC1] Product selected: Apple iPhone 15, 128 GB, Black - Unlocked
  💰 [TC1] iPhone Price: $799.00
[TC1] Adding product to cart...
[TC1] ✅ Product successfully added to cart.
========================================

========================================
  TEST CASE 2 — Samsung Galaxy
========================================
[TC2] Navigating to Amazon and searching for: "Samsung Galaxy S24"
[TC2] Clicking first product result...
[TC2] Product selected: Samsung Galaxy S24 5G, 128GB, Onyx Black
  💰 [TC2] Galaxy Price: $699.99
[TC2] Adding product to cart...
[TC2] ✅ Product successfully added to cart.
========================================
```

---

## 🛠️ Tech Stack

| Tool | Purpose |
|------|---------|
| [Playwright](https://playwright.dev) | Browser automation framework |
| JavaScript (Node.js) | Language |
| LambdaTest Cloud (Bonus) | Cross-browser cloud test execution |

---

## ⚠️ Notes

- Amazon occasionally shows CAPTCHA or regional redirects — re-running the test usually resolves this.
- The `utils/amazonHelpers.js` file contains shared helpers and tries multiple price selectors to handle Amazon's dynamic DOM.
- Screenshots are captured automatically on test failure inside `test-results/`.
