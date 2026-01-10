import { describe, expect, it } from "vitest";

import { setupTables } from "./setup-tables";

describe("sqlite", () => {
  it("should handle empty input array", () => {
    expect(() => setupTables({ prefix: "test", data: [] })).not.throw();
  });

  it("should handle empty arrays", () => {
    expect(() =>
      setupTables({
        prefix: "test",
        data: [
          { value: "a", items: [] },
          { value: "b", items: [] },
        ],
      }),
    ).not.throw();
  });

  it("should create a simple table with integer values", () => {
    expect(() =>
      setupTables({
        prefix: "test",
        data: [{ value: 1 }, { value: 2 }, { value: 3 }],
      }),
    ).not.throw();
  });

  it("should create a table with mixed integer and real values", () => {
    expect(() =>
      setupTables({
        prefix: "test",
        data: [{ value: 1 }, { value: 2.5 }, { value: 3 }],
      }),
    ).not.throw();
  });

  it("should create a table with nullable fields when null values are present", () => {
    expect(() =>
      setupTables({
        prefix: "test",
        data: [{ value: 1 }, { value: null }, { value: 3 }],
      }),
    ).not.throw();
  });

  it("should create nested tables for arrays with foreign key relationships", () => {
    expect(() =>
      setupTables({
        prefix: "test",
        data: [
          { value: "a", items: [{ value: 1 }, { value: 2 }, { value: 3 }] },
          { value: "b", items: [{ value: 4 }, { value: 5 }, { value: 6 }] },
        ],
      }),
    ).not.throw();
  });

  it("should handle deeply nested arrays with multiple levels of relationships", () => {
    expect(
      setupTables({
        prefix: "test",
        data: [
          {
            value: "a",
            items: [{ elements: [{ value: true }, { value: false }] }],
          },
        ],
      }),
    );
  });

  it("should generate migration for objects with different property names", () => {
    expect(() =>
      setupTables({
        prefix: "test",
        data: [{ a: "a" }, { b: "b" }],
      }),
    ).not.throw();
  });
});
