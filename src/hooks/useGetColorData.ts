import { useEffect, useMemo, useState } from "react";
import { rgbToHsl } from "../utils/RgbToHsl";
import { hexToRgb } from "../utils/HexToRgb";
import { ColorDetails } from "../interfaces/interface";

export default function useGetColorData() {
  const [colorData, setColorData] = useState<ColorDetails[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const hexToRgbMemoized = useMemo(() => hexToRgb, []);
  const rgbToHslMemoized = useMemo(() => rgbToHsl, []);

  const fetchColors = () => {
    setLoading(true);
    fetch(
      "https://raw.githubusercontent.com/NishantChandla/color-test-resources/main/xkcd-colors.json"
    )
      .then((response) => response.json())
      .then(({ colors }) => {
        const data = colors?.map((color: ColorDetails) => {
          const rgb = hexToRgbMemoized(color.hex);
          const hsl = rgbToHslMemoized(rgb.split(",").map((val) => +val));
          return {
            ...color,
            rgb,
            hsl,
          };
        });
        setColorData(data);
        setLoading(false);
        setHasError(false);
      })
      .catch((_) => {
        setHasError(true);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchColors();
  }, []);

  return { colorData, loading, fetchColors, hasError };
}
