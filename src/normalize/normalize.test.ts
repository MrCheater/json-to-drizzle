import { describe, expect, it } from "vitest";

import { normalize } from "./normalize";

describe("normalize", () => {
  it("should flatten nested objects with localization and arrays", () => {
    expect(
      normalize([
        {
          id: 1,
          description: {
            ru: "тест",
            en: "test",
            zh: "測試",
          },
          items: [{ elements: [1, 2, 3], container: { value: 4 } }],
          arr: [[[{ container: { value: 5 } }]]],
          button: {
            margin: {
              left: 10,
              right: 20,
            },
            color: {
              rgba: {
                r: 123,
                g: 234,
                b: 341,
                a: 50,
              },
            },
          },
        },
      ]),
    ).toEqual([
      {
        arr: [
          {
            items: [
              {
                items: [
                  {
                    container_value: 5,
                  },
                ],
              },
            ],
          },
        ],
        description: [
          {
            lang: "ru",
            text: "тест",
          },
          {
            lang: "en",
            text: "test",
          },
          {
            lang: "zh",
            text: "測試",
          },
        ],
        id: 1,
        items: [
          {
            container_value: 4,
            elements: [{ value: 1 }, { value: 2 }, { value: 3 }],
          },
        ],
        button_color_rgba_a: 50,
        button_color_rgba_b: 341,
        button_color_rgba_g: 234,
        button_color_rgba_r: 123,
        button_margin_left: 10,
        button_margin_right: 20,
      },
    ]);
  });

  it("should wrap numbers in objects with value property", () => {
    expect(normalize([1, 2, 3])).toEqual([
      {
        value: 1,
      },
      {
        value: 2,
      },
      {
        value: 3,
      },
    ]);
  });

  it("should wrap booleans in objects with value property", () => {
    expect(normalize([true, false])).toEqual([
      {
        value: true,
      },
      {
        value: false,
      },
    ]);
  });

  it("should handle mixed array with numbers and null", () => {
    expect(normalize([1, 2, null])).toEqual([
      {
        value: 1,
      },
      {
        value: 2,
      },
      {
        value: null,
      },
    ]);
  });

  it("should handle array starting with null followed by numbers", () => {
    expect(normalize([null, 2, 3])).toEqual([
      {
        value: null,
      },
      {
        value: 2,
      },
      {
        value: 3,
      },
    ]);
  });

  it("should return empty array for empty input", () => {
    expect(normalize([])).toEqual([]);
  });
});
