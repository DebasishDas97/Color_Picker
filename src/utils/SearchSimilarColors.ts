import { ColorDetails } from "../interfaces/interface";

export default function searchForSimilarColors(
  searchQuery: string,
  colorData: ColorDetails[]
): ColorDetails[] {
  const similarColors: ColorDetails[] = [];

  // Check if the search query is a valid RGB value
  if (searchQuery.startsWith("rgb(") && searchQuery.endsWith(")")) {
    const [r, g, b] = searchQuery
      .substring(4, searchQuery.length - 1)
      .split(",")
      .map((s) => parseInt(s.trim()));

    // Loop through each color in the colorData array
    for (const color of colorData) {
      const [cr, cg, cb] = color.rgb
        .substring(4, color.rgb.length - 1)
        .split(",")
        .map((s) => parseInt(s.trim()));

      // Check if the RGB values are similar
      if (
        Math.abs(cr - r) <= 30 &&
        Math.abs(cg - g) <= 30 &&
        Math.abs(cb - b) <= 30
      ) {
        similarColors.push(color);
      }
    }
  }
  // Check if the search query is a valid hex value
  else if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(searchQuery)) {
    const r = parseInt(searchQuery.substring(1, 3), 16);
    const g = parseInt(searchQuery.substring(3, 5), 16);
    const b = parseInt(searchQuery.substring(5, 7), 16);

    // Loop through each color in the colorData array
    for (const color of colorData) {
      const cr = parseInt(color.hex.substring(1, 3), 16);
      const cg = parseInt(color.hex.substring(3, 5), 16);
      const cb = parseInt(color.hex.substring(5, 7), 16);

      // Check if the RGB values are similar
      if (
        Math.abs(cr - r) <= 30 &&
        Math.abs(cg - g) <= 30 &&
        Math.abs(cb - b) <= 30
      ) {
        similarColors.push(color);
      }
    }
  }

  return similarColors;
}
