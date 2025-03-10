import * as c from "@ant-design/colors";
import clsx from "clsx";
import type { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

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
          (colorArray as string[]).map((color, index) => [index + 1, color]),
        ),
      ]),
  );
}

/**
 * Merges multiple class value inputs into a single string of class names.
 *
 * This function accepts any number of inputs representing class names. It first processes them with
 * the `clsx` function to consolidate strings, arrays, or object maps into a unified string, then uses
 * `twMerge` to resolve and merge any conflicting Tailwind CSS classes.
 *
 * @param inputs - An array of class value inputs, each of which can be of type string, object, or array.
 * @returns A string containing the merged class names.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
