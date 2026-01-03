import { describe, expect, it } from "vitest";

import { createRelationalStructure } from "./create-relational-structure";
import type { RelationalTable } from "./types.ts";

describe("create-relational-structure", () => {
  it("should handle empty input array", () => {
    expect(createRelationalStructure("test", [])).toEqual([
      {
        name: "test",
        fields: [
          {
            isPrimaryKey: true,
            key: "_id",
            type: "integer",
          },
        ],
        data: [],
      },
    ] satisfies RelationalTable[]);
  });

  it("should handle empty arrays", () => {
    expect(
      createRelationalStructure("test", [
        { value: true, items: [] },
        { value: false, items: [] },
      ]),
    ).toEqual([
      {
        name: "test",
        fields: [
          {
            isPrimaryKey: true,
            key: "_id",
            type: "integer",
          },
          {
            key: "value",
            type: "boolean",
          },
        ],
        data: [
          { _id: 0, value: true },
          { _id: 1, value: false },
        ],
      },
      {
        data: [],
        fields: [
          {
            reference: {
              key: "_id",
              table: "test",
            },
            isPrimaryKey: true,
            key: "_parent_id",
            type: "integer",
          },
          {
            isPrimaryKey: true,
            key: "_id",
            type: "integer",
          },
        ],
        name: "test_items",
      },
    ] satisfies RelationalTable[]);
  });

  it("should create a simple table with integer values", () => {
    expect(
      createRelationalStructure("test", [
        { value: 1 },
        { value: 2 },
        { value: 3 },
      ]),
    ).toEqual([
      {
        name: "test",
        fields: [
          {
            isPrimaryKey: true,
            key: "_id",
            type: "integer",
          },
          {
            key: "value",
            type: "integer",
          },
        ],
        data: [
          { _id: 0, value: 1 },
          { _id: 1, value: 2 },
          { _id: 2, value: 3 },
        ],
      },
    ] satisfies RelationalTable[]);
  });

  it("should create a table with mixed integer and real values", () => {
    expect(
      createRelationalStructure("test", [
        { value: 1 },
        { value: 2.5 },
        { value: 3 },
      ]),
    ).toEqual([
      {
        name: "test",
        fields: [
          {
            isPrimaryKey: true,
            key: "_id",
            type: "integer",
          },
          {
            key: "value",
            type: "real",
          },
        ],
        data: [
          { _id: 0, value: 1 },
          { _id: 1, value: 2.5 },
          { _id: 2, value: 3 },
        ],
      },
    ] satisfies RelationalTable[]);
  });

  it("should create a table with nullable fields when null values are present", () => {
    expect(
      createRelationalStructure("test", [
        { value: 1 },
        { value: null },
        { value: 3 },
      ]),
    ).toEqual([
      {
        name: "test",
        fields: [
          {
            isPrimaryKey: true,
            key: "_id",
            type: "integer",
          },
          {
            isNullable: true,
            key: "value",
            type: "integer",
          },
        ],
        data: [
          { _id: 0, value: 1 },
          { _id: 1, value: null },
          { _id: 2, value: 3 },
        ],
      },
    ] satisfies RelationalTable[]);
  });

  it("should create nested tables for arrays with foreign key relationships", () => {
    expect(
      createRelationalStructure("test", [
        { value: "a", items: [{ value: 1 }, { value: 2 }, { value: 3 }] },
        { value: "b", items: [{ value: 4 }, { value: 5 }, { value: 6 }] },
      ]),
    ).toEqual([
      {
        name: "test",
        fields: [
          {
            isPrimaryKey: true,
            key: "_id",
            type: "integer",
          },
          {
            key: "value",
            type: "text",
          },
        ],
        data: [
          { _id: 0, value: "a" },
          { _id: 1, value: "b" },
        ],
      },
      {
        name: "test_items",
        fields: [
          {
            isPrimaryKey: true,
            key: "_parent_id",
            type: "integer",
            reference: { key: "_id", table: "test" },
          },
          {
            isPrimaryKey: true,
            key: "_id",
            type: "integer",
          },
          {
            key: "value",
            type: "integer",
          },
        ],
        data: [
          { _parent_id: 0, _id: 0, value: 1 },
          { _parent_id: 0, _id: 1, value: 2 },
          { _parent_id: 0, _id: 2, value: 3 },
          { _parent_id: 1, _id: 0, value: 4 },
          { _parent_id: 1, _id: 1, value: 5 },
          { _parent_id: 1, _id: 2, value: 6 },
        ],
      },
    ] satisfies RelationalTable[]);
  });

  it("should handle deeply nested arrays with multiple levels of relationships", () => {
    expect(
      createRelationalStructure("test", [
        {
          value: "a",
          items: [{ elements: [{ value: 1 }, { value: 2 }, { value: 3 }] }],
        },
      ]),
    ).toEqual([
      {
        name: "test",
        fields: [
          {
            isPrimaryKey: true,
            key: "_id",
            type: "integer",
          },
          {
            key: "value",
            type: "text",
          },
        ],
        data: [{ _id: 0, value: "a" }],
      },
      {
        name: "test_items",
        fields: [
          {
            isPrimaryKey: true,
            key: "_parent_id",
            type: "integer",
            reference: { key: "_id", table: "test" },
          },
          {
            isPrimaryKey: true,
            key: "_id",
            type: "integer",
          },
        ],
        data: [{ _parent_id: 0, _id: 0 }],
      },
      {
        name: "test_items_elements",
        fields: [
          {
            isPrimaryKey: true,
            key: "_parent_id",
            type: "integer",
            reference: { key: "_id", table: "test_items" },
          },
          {
            isPrimaryKey: true,
            key: "_id",
            type: "integer",
          },
          {
            key: "value",
            type: "integer",
          },
        ],
        data: [
          { _parent_id: 0, _id: 0, value: 1 },
          { _parent_id: 0, _id: 1, value: 2 },
          { _parent_id: 0, _id: 2, value: 3 },
        ],
      },
    ] satisfies RelationalTable[]);
  });
});
