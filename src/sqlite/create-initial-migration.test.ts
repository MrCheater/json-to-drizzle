import { describe, expect, it } from "vitest";

import { createRelationalStructure } from "../create-relational-structure";
import { normalize } from "../normalize";
import { createInitialMigration } from "./create-initial-migration";

describe("sqlite/create-initial-migration", () => {
  it("should handle empty input array", () => {
    expect(
      createInitialMigration(createRelationalStructure("test", normalize([]))),
    ).toMatchSnapshot();
  });

  it("should handle empty arrays", () => {
    expect(
      createInitialMigration(
        createRelationalStructure("test", [
          { value: "a", items: [] },
          { value: "b", items: [] },
        ]),
      ),
    ).toMatchSnapshot();
  });

  it("should create a simple table with integer values", () => {
    expect(
      createInitialMigration(
        createRelationalStructure(
          "test",
          normalize([{ value: 1 }, { value: 2 }, { value: 3 }]),
        ),
      ),
    ).toMatchSnapshot();
  });

  it("should create a table with mixed integer and real values", () => {
    expect(
      createInitialMigration(
        createRelationalStructure(
          "test",
          normalize([{ value: 1 }, { value: 2.5 }, { value: 3 }]),
        ),
      ),
    ).toMatchSnapshot();
  });

  it("should create a table with nullable fields when null values are present", () => {
    expect(
      createInitialMigration(
        createRelationalStructure(
          "test",
          normalize([{ value: 1 }, { value: null }, { value: 3 }]),
        ),
      ),
    ).toMatchSnapshot();
  });

  it("should create nested tables for arrays with foreign key relationships", () => {
    expect(
      createInitialMigration(
        createRelationalStructure(
          "test",
          normalize([
            { value: "a", items: [{ value: 1 }, { value: 2 }, { value: 3 }] },
            { value: "b", items: [{ value: 4 }, { value: 5 }, { value: 6 }] },
          ]),
        ),
      ),
    ).toMatchSnapshot();
  });

  it("should handle deeply nested arrays with multiple levels of relationships", () => {
    expect(
      createInitialMigration(
        createRelationalStructure(
          "test",
          normalize([
            {
              value: "a",
              items: [{ elements: [{ value: true }, { value: false }] }],
            },
          ]),
        ),
      ),
    ).toMatchSnapshot();
  });

  it("should generate migration for objects with different property names", () => {
    expect(
      createInitialMigration(
        createRelationalStructure("test", normalize([{ a: "a" }, { b: "b" }])),
      ),
    ).toMatchSnapshot();
  });
});
