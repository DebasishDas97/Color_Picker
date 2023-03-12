import { useState, createContext, useContext } from "react";
import { ColorPickerContextData } from "../interfaces/interface";
import useGetColorData from "../hooks/useGetColorData";

type Props = {
  children: React.ReactNode;
};

const ColorPickerContext = createContext<ColorPickerContextData | undefined>(
  undefined
);

export const ColorProvider = ({ children }: Props) => {
  const { colorData, loading, fetchColors, serverMessage } = useGetColorData();
  const [searchQuery, setSearchQuery] = useState("");

  let filteredData = colorData?.filter((item) => {
    if (searchQuery.toLowerCase() === "") {
      return item;
    } else if (searchQuery.toLowerCase().includes("rgb(")) {
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
    filteredData = filteredData?.slice(0, 100);
  }

  return (
    <ColorPickerContext.Provider
      value={{
        loading,
        filteredData,
        searchQuery,
        serverMessage,
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
