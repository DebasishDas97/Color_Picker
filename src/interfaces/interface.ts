import { Dispatch, SetStateAction } from "react";

interface ColorDetails {
  color: string;
  hex: string;
  rgb: string;
  hsl: string;
}

interface ColorPickerContextData {
  loading: boolean;
  filteredData: ColorDetails[];
  searchQuery: string;
  serverMessage: unknown;
  setSearchQuery: Dispatch<SetStateAction<string>>;
  fetchColors: () => void;
}

export type { ColorDetails, ColorPickerContextData };
