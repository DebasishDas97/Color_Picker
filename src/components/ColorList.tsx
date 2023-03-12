import useGlobalContext from "../context/context";
import Error from "./Error";

export default function ColorList() {
  const { loading, filteredData } = useGlobalContext()!;

  if (loading) {
    return (
      <div className="lds-hourglass flex justify-center items-center m-10" />
    );
  }

  return filteredData.length !== 0 ? (
    <>
      <h3 className="text-black pl-10 mt-12 text-2xl">All Colors.</h3>
      <div className="flex items-center mt-3 pl-6">
        <table className="border-separate border-spacing-5">
          <thead>
            <tr className="text-3xl text-left">
              <th></th>
              <th className="w-[150px]">Name</th>
              <th className="w-[150px]">Hex</th>
              <th className="w-[150px]">RGB</th>
              <th className="w-[150px]">HSL</th>
            </tr>
          </thead>
          <tbody>
            {filteredData?.map(({ color, hex, rgb, hsl }) => (
              <tr key={hex} className="">
                <td
                  className="w-10 h-10 rounded-md"
                  style={{ backgroundColor: `rgb(${rgb})` }}
                ></td>
                <td className="w-[200px] text-xl capitalize">{color}</td>
                <td className="w-[200px] text-xl">{hex}</td>
                <td className="w-[200px] text-xl">{rgb}</td>
                <td className="w-[200px] text-xl">{hsl}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  ) : (
    <Error />
  );
}
