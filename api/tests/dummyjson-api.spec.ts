import { test, expect } from "../src/fixtures/api-fixtures";
import { testProduct, testProductExpectation } from "../src/data/products";

test.describe("DummyJSON API Tests", () => {
  test("GET /products/1 should return valid product", async ({
    apiContext,
  }) => {
    const response = await apiContext.get("/products/1");
    expect(response.ok()).toBeTruthy();

    const body = await response.json();
    expect(body).toMatchObject({
      id: 1,
      title: expect.any(String),
      price: expect.any(Number),
      category: expect.any(String),
    });
  });

  test("POST /products/add should create a product and return it", async ({
    apiContext,
  }) => {
    const response = await apiContext.post("/products/add", {
      data: testProduct,
    });
    expect(response.status()).toBe(201);

    const body = await response.json();
    expect(body).toMatchObject(testProductExpectation);
  });
});
