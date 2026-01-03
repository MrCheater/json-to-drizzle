export function snakeCase(key: string) {
  return (
    key
      // Replace each space, dot, or hyphen with underscore
      .replace(/[.\s-]/g, "_")
      // Insert underscore between lowercase and uppercase letters
      .replace(/([a-z])([A-Z])/g, "$1_$2")
      // Insert underscore between digit and uppercase letter
      .replace(/([0-9])([A-Z])/g, "$1_$2")
      // Insert underscore between uppercase letters when followed by lowercase (for acronyms)
      .replace(/([A-Z])([A-Z][a-z])/g, "$1_$2")
      // Convert everything to lowercase
      .toLowerCase()
      // Remove underscores only from start and end of string
      .replace(/^_+|_+$/g, "")
  );
}
