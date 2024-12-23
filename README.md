# Playwright Test Automation Framework

This repository contains a Playwright test automation framework for automating user workflows on the [Learn Automation Courses](https://freelance-learn-automation.vercel.app) website.

## Prerequisites

Before you begin, ensure you have the following installed on your system:

- [Node.js](https://nodejs.org/) (v22 or later)
- [Git](https://git-scm.com/)

## Setup Instructions

1. Clone this repository:
   ```bash
   git clone <https://github.com/kumaryogidev/searchlightassesmentqa>
   cd <searchlightassesmentqa>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Verify the Playwright environment is set up:
   ```bash
   npx playwright install
   ```

4. Run a test to confirm setup:
   ```bash
   npx playwright test
   ```

## Test Execution

### Running All Tests
To execute all test cases:
```bash
npx playwright test
```

### Running Specific Tests
To run a specific test file, use:
```bash
npx playwright test tests/<test-file-name>.spec.ts
```

### Viewing Test Results
After a test run, view the HTML report:
```bash
npx playwright show-report
```

### Debugging Tests
Run tests in headed mode with additional debugging information:
```bash
npx playwright test --headed --debug
```

## Tests Overview

### User Account Tests
- Automates the creation of a new user, interacting with input fields, dropdowns, checkboxes, and buttons.

### Training Course Enrollment
- Verifies the workflow for enrolling in multiple training courses and validates cart updates dynamically.

## Directory Structure

```
project-root/
│
├── tests/                   # Test files
│   ├── signup.spec.ts       # User account creation tests
│   ├── enrollment.spec.ts   # Training course enrollment tests
│   ├── utils/               # Utility functions
│       ├── common.ts        # Common helper functions
│
├── playwright.config.ts     # Playwright configuration
├── package.json             # Dependencies and scripts
├── README.md                # Project documentation
```

## Notes and Assumptions

- **Assumptions**:
  - The website elements (e.g., headings, buttons, etc.) remain consistent with the current implementation.
  - Cart updates and button state changes are correctly reflected after user actions.

- **Instructions**:
  - Update the email and name dynamically in tests if required.
  - Use `tests/enrollment.spec.ts` to validate the enrollment workflow.

## Best Practices Followed
- Modular and reusable code to enhance maintainability.
- Assertions are added to ensure that test steps produce expected outcomes.
- Loops are used to avoid code duplication in repetitive scenarios.

