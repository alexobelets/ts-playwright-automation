import { test as base, request, APIRequestContext } from "@playwright/test";

type ApiFixtures = {
  apiContext: APIRequestContext;
};

export const test = base.extend<ApiFixtures>({
  // eslint-disable-next-line no-empty-pattern
  apiContext: async ({}, use) => {
    const context = await request.newContext({
      baseURL: process.env.API_BASE_URL,
    });
    await use(context);
    await context.dispose();
  },
});

export { expect } from "@playwright/test";
