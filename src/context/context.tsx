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


  return (
    <ColorPickerContext.Provider
      value={{
        loading,
        colorData,
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
