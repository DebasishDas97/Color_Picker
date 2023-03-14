import { useState, createContext, useContext } from "react";
import { ColorPickerContextData } from "../interfaces/interface";
import useGetColorData from "../hooks/useGetColorData";
import searchForSimilarColors from "../utils/SearchSimilarColors";

type Props = {
  children: React.ReactNode;
};

const ColorPickerContext = createContext<ColorPickerContextData | undefined>(
  undefined
);

const MAX_SIMILAR_COLORS = 100;

export const ColorProvider = ({ children }: Props) => {
  const { colorData, loading, fetchColors, hasError } = useGetColorData();
  const [searchQuery, setSearchQuery] = useState("");

  let filteredData = colorData?.filter((item) => {
    if (searchQuery.toLowerCase() === "") {
      return item;
    } else if (searchQuery.startsWith("rgb(") && searchQuery.endsWith(")")) {
      const searchTerm = searchQuery
        .replaceAll("rgb(", "")
        .split("")
        .slice(0, -1)
        .join("");
      return item.rgb.toLowerCase().includes(searchTerm);
    } else
      return (
        item.color.toLowerCase().includes(searchQuery) ||
        item.hex.toLowerCase().includes(searchQuery)
      );
  });

  if (searchQuery !== "") {
    const similarColors = searchForSimilarColors(searchQuery, colorData);
    filteredData = [...filteredData, ...similarColors].slice(0, MAX_SIMILAR_COLORS);
  }

  return (
    <ColorPickerContext.Provider
      value={{
        loading,
        filteredData,
        searchQuery,
        hasError,
        setSearchQuery,
        fetchColors,
      }}
    >
      {children}
    </ColorPickerContext.Provider>
  );
};

export default function useGlobalContext() {
  return useContext(ColorPickerContext);
}
