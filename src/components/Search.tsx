import useGlobalContext from "../context/context";

export default function Search() {
  const { setSearchQuery, colorData, fetchColors, serverMessage } =
    useGlobalContext()!;

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code === "Enter") {
      const inputElement = e.target as HTMLInputElement;
      setSearchQuery(inputElement.value);
      inputElement.value = "";
    }
  };

  return (
    <div className="pl-10 pt-10">
      <h1 className="text-6xl font-bold font-mono">Colour Searcher</h1>
      <p className="text-2xl mt-5 mb-2">Colour 🎨</p>
      <div className="flex items-center">
        <input
          className="p-2 rounded-md w-[250px] border-2 border-gray-400"
          type="search"
          placeholder="Enter Colour"
          onKeyDown={handleKeyDown}
        />
        <input
          className="ml-3 rounded-md h-10 border-2 border-zinc-500"
          type="color"
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {!colorData || serverMessage ? (
          <button
            className="px-6 py-2.5 rounded-md ml-5 bg-green-600 text-white text-xl cursor-pointer"
            onClick={fetchColors}
          >
            Retry
          </button>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
