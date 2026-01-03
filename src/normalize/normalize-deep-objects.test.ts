import { describe, expect, it } from "vitest";

import { normalizeDeepObjects } from "./normalize-deep-objects";

describe("normalizeDeepObjects", () => {
  it("should return primitive numbers unchanged", () => {
    expect(normalizeDeepObjects(1)).toEqual(1);
  });

  it("should return empty strings unchanged", () => {
    expect(normalizeDeepObjects("")).toEqual("");
  });

  it("should return empty objects unchanged", () => {
    expect(normalizeDeepObjects({})).toEqual({});
  });

  it("should return null unchanged", () => {
    expect(normalizeDeepObjects(null)).toEqual(null);
  });

  it("should flatten nested objects with arrays", () => {
    expect(
      normalizeDeepObjects([
        {
          a: "a",
          b: { c: "c" },
          d: { e: [{ f: { g: "g" } }] },
        },
      ]),
    ).toEqual([
      {
        a: "a",
        b_c: "c",
        d_e: [
          {
            f_g: "g",
          },
        ],
      },
    ]);
  });

  it("should handle deeply nested structures with null values", () => {
    expect(
      normalizeDeepObjects([[{ a: { b: [{ c: { d: null } }] } }]]),
    ).toEqual([
      [
        {
          a_b: [
            {
              c_d: null,
            },
          ],
        },
      ],
    ]);
  });

  it("should flatten complex object with arrays of objects", () => {
    expect(
      normalizeDeepObjects({
        a: {
          b: "a.b",
          c: {
            d: "a.c.d",
          },
          items: [1, 2, 3],
          elements: [
            { item: { value: 1 } },
            { item: { value: 2 } },
            { item: { value: 3 } },
          ],
        },
      }),
    ).toEqual({
      a_b: "a.b",
      a_c_d: "a.c.d",
      a_elements: [
        {
          item_value: 1,
        },
        {
          item_value: 2,
        },
        {
          item_value: 3,
        },
      ],
      a_items: [1, 2, 3],
    });
  });
});
