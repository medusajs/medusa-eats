/**
 * Converts a string to either snake case or kebab case.
 *
 * @param {string} str - The string to convert.
 * @param {string} format - 'snake' or 'kebab' to determine the output format
 * @returns {string} - The converted string in the specified format.
 */
export function toCaseFormat(str: string, format: "snake" | "kebab"): string {
  const separator = format === "snake" ? "_" : "-"

  return (
    str
      // Handle the first character to avoid prepending separator if uppercase
      .replace(/^./, (match) => match.toLowerCase())
      .replace(/[A-Z]/g, ($1) => `${separator}${$1.toLowerCase()}`) // Match capitals
      .replace(/[\s\-_]+/g, separator) // Normalize separators
      .replace(/[^a-z0-9_\-]/gi, "") // Clean up non-alphanumerics, allowing for both separators
      .replace(new RegExp(`${separator}+`, "g"), separator) // Remove extra separators
      .trim()
  ) // Trim leading/trailing space
}
