import * as c from "@ant-design/colors";

/**
 * Generates a Tailwind-compatible color scale from Ant Design color arrays.
 *
 * This function iterates through the color entries of the internal color object,
 * filters out entries that are not arrays (avoiding non-color entries like functions),
 * and maps each valid color array to an object where the keys are the color scale indices (starting at 1)
 * and the values are the color strings.
 *
 * @returns An object mapping each color name to its corresponding Tailwind color scale object.
 */
export function generateAntdColors() {
  return Object.fromEntries(
    Object.entries(c)
      // Filter out non-color arrays (like generate function)
      .filter(([_, value]) => Array.isArray(value))
      // Map each color array to Tailwind's color scale format
      .map(([colorName, colorArray]) => [
        colorName,
        Object.fromEntries(
          (colorArray as string[]).map((color, index) => [index + 1, color])
        ),
      ]),
  );
}
