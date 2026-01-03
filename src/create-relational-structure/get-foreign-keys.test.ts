import { describe, expect, it } from "vitest";

import { createForeignKey } from "./create-foreign-key";
import { createRelationalTable } from "./create-relational-table";
import { getForeignKeys } from "./get-foreign-keys";
import type { ForeignKey } from "./types";

describe("get-foreign-keys", () => {
  it("should return foreign keys", () => {
    const listTable = createRelationalTable({
      name: "list",
      fields: [
        { key: "_id", type: "integer", isPrimaryKey: true },
        { key: "label", type: "text" },
        { key: "value", type: "integer" },
        { key: "is_active", type: "boolean" },
      ],
      data: [],
    });
    const listItemsTable = createRelationalTable({
      name: "list_items",
      fields: [
        {
          key: "_parent_id",
          type: "integer",
          isPrimaryKey: true,
          reference: createForeignKey(listTable, "_id"),
        },
        { key: "_id", type: "integer", isPrimaryKey: true },
        { key: "text", type: "text" },
      ],
      data: [],
    });

    expect(getForeignKeys(listItemsTable)).toEqual([
      {
        reference: {
          key: "_id",
          table: "list",
        },
        key: "_parent_id",
      },
    ] satisfies ForeignKey[]);
  });
});
