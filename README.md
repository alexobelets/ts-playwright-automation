
# DSV Automation Project

End-to-end automation project for UI and API testing using **Playwright** and **TypeScript**.

## 📦 Project Structure

```txt
dsv/
├── api/                    # API tests and source (DummyJSON example)
├── ui/                     # UI tests and page objects
├── .env.example            # Example environment variables
├── playwright.config.ts    # Playwright configuration
├── tsconfig.json           # TypeScript config
├── .eslintrc.js            # ESLint config
└── README.md               # Project documentation (this file)
```

## 🚀 Getting Started

### 1. Clone and install dependencies

```bash
git clone <repo_url>
cd dsv
npm install
```

### 2. Set up environment

Copy `.env.example` to `.env` and update variables like `BASE_URL` if needed.

```bash
cp .env.example .env
```

### 3. Run tests

#### All tests

```bash
npm test
```

#### UI only

```bash
npm run test:ui
```

#### API only

```bash
npm run test:api
```

### 4. Linting and formatting

```bash
npm run lint          # Run ESLint
npm run prettier:check  # Check formatting
npm run prettier:fix    # Auto-fix formatting
```

## Tech Stack

- Playwright
- TypeScript
- ESLint + Prettier
- dotenv

## Applied Principles

### SOLID

- **S**ingle Responsibility: UI/Page objects only contain interactions, helpers handle logic.
- **O**pen/Closed: BasePage + Page Steps allow extension without modification.
- **L**iskov Substitution: Each Page class can be reused without breaking behavior.
- **I**nterface Segregation: (not heavily used here, but code is modular)
- **D**ependency Inversion: dotenv, env usage abstracted from test logic.

### KISS (Keep It Simple, Stupid)

- Clear structure with separate folders for `ui/`, `api/`.
- Minimalistic setup for maintainability.

### DRY (Don't Repeat Yourself)

- Shared methods in BasePage.
- Reusable locators and helper utilities.

### YAGNI (You Aren’t Gonna Need It)

- No over-engineering for unused features (e.g., no fixtures/global setup unless necessary).

## Suggestions for Improvement

- Add Playwright fixtures if login or shared context is introduced.
- Move shared constants to `utils/constants.ts` if reused.
- Add `globalSetup.ts` if login or token setup needed.
- Use `storageState` for logged-in UI tests (if needed).
- Add `CI` support (GitHub Actions or similar).

## License

ISC License
