import { expect } from '@playwright/test';

export const testProduct = {
  title: 'Test Product',
  price: 199,
  description: 'This is a test product for automation',
  category: 'smartphones',
};

export const testProductExpectation = {
  id: expect.any(Number),
  ...testProduct,
};
