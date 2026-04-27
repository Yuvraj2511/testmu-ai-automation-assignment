# TestMu AI Automation Assignment

Automation assignment submission for the Customer Engineering Intern role at TestMu AI (formerly LambdaTest) using Playwright with JavaScript.

---

## Objective

This project automates the following Amazon shopping scenarios:

### Test Case 1: iPhone Search and Add to Cart
- Navigate to Amazon.com
- Search for iPhone
- Select a product from search results
- Print the product price to the console
- Add the product to cart

### Test Case 2: Galaxy Device Search and Add to Cart
- Navigate to Amazon.com
- Search for Galaxy device
- Select a product from search results
- Print the product price to the console
- Add the product to cart

---

## Parallel Execution

Both test cases are configured to run in parallel using Playwright's built-in parallel worker configuration.

---

## Tech Stack Used

- Playwright
- JavaScript
- Node.js
- LambdaTest Cloud Integration

---

## Project Structure

testmu-ai-automation-assignment/
│
├── tests/                         # Test scripts
├── utils/                         # Helper utility files
├── package.json                   # Dependencies
├── playwright.config.js           # Local Playwright config
├── playwright.lambdatest.config.js# LambdaTest cloud config
└── README.md

---

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/Yuvraj2511/testmu-ai-automation-assignment.git
cd testmu-ai-automation-assignment
