import { describe, expect, it } from "vitest";

import { snakeCase } from "./snake-case";

describe("snakeCase", () => {
  const testCases = [
    // Basic transformations
    { input: "camelCase", expected: "camel_case" },
    { input: "PascalCase", expected: "pascal_case" },
    { input: "helloWorld", expected: "hello_world" },
    { input: "javaScript", expected: "java_script" },

    // Separator conversions
    { input: "kebab-case", expected: "kebab_case" },
    { input: "hello-world", expected: "hello_world" },
    { input: "hello world", expected: "hello_world" },
    { input: "hello.world", expected: "hello_world" },
    { input: "some.property.name", expected: "some_property_name" },

    // Edge cases
    { input: "", expected: "" },
    { input: "a", expected: "a" },
    { input: "A", expected: "a" },
    { input: "already_snake_case", expected: "already_snake_case" },

    // With numbers
    { input: "camelCase123", expected: "camel_case123" },
    { input: "test123Property", expected: "test123_property" },

    // Acronyms and consecutive uppercase
    { input: "XMLHttpRequest", expected: "xml_http_request" },
    { input: "HTTPResponse", expected: "http_response" },
    { input: "parseJSONData", expected: "parse_json_data" },

    // Mixed separators
    { input: "hello.world-test space", expected: "hello_world_test_space" },
    { input: "hello--world", expected: "hello__world" },

    // Real-world examples
    { input: "userName", expected: "user_name" },
    { input: "createdAt", expected: "created_at" },
    { input: "firstName", expected: "first_name" },
    { input: "getUserById", expected: "get_user_by_id" },
  ];

  testCases.forEach(({ input, expected }) => {
    it(`should convert "${input}" to "${expected}"`, () => {
      expect(snakeCase(input)).toBe(expected);
    });
  });
});
