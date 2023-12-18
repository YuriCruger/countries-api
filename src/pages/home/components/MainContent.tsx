import { useQuery } from "react-query";
import { dataType } from "types/dataType";
import { fetchData } from "../../../App";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { useEffect, useState } from "react";
import { setCurrentCountry } from "features/data/dataSlice";
import { Link } from "react-router-dom";

export default function MainContent() {
  const { data } = useQuery<dataType[]>("repos", fetchData, {
    staleTime: 1000 * 60, // 1 minute
  });
  const [filteredData, setFilteredData] = useState<dataType[]>([]);

  const region = useAppSelector((state) => state.data.region);
  const inputValue = useAppSelector((state) => state.data.country);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const filteredCountries = (data || []).filter((country) => {
      const matchesRegion = country.region === region || region === 'Filter by Region';
      const matchesInputValue = !inputValue || country.name.toLowerCase() === inputValue;

      return matchesRegion && matchesInputValue;
    });

    setFilteredData(filteredCountries);
  }, [data, region, inputValue]);

  return (
    <main className="flex flex-col mx-auto gap-10 my-10 w-4/6 bg-veryLightGray dark:bg-veryDarkBlue dark:text-white sm:w-full sm:px-10 sm:grid sm:grid-cols-2 lg:grid-cols-3 lg:px-14 xl:grid-cols-4 xl:px-20 2xl:px-52">
      {filteredData?.map((country) => (
        <div key={country.name} className="rounded-md shadow-md overflow-hidden bg-white dark:bg-darkBlue">
          <div className="h-60">
            <Link to={`/${country.alpha3Code}`}>
              <img
                className="w-full cursor-pointer"
                src={country.flag}
                alt={`Flag of ${country.name}`}
                onClick={() => dispatch(setCurrentCountry(country))}
              />
            </Link>
          </div>

          <div className="p-5">
            <Link to={`/${country.alpha3Code}`}>
              <h2
                onClick={() => {
                  dispatch(setCurrentCountry(country));
                  console.log('Dispatched setCurrentCountry');
                }}
                className="font-extrabold text-lg mb-5 cursor-pointer w-fit"
              >
                {country.name}
              </h2>
            </Link>

            <div className="flex flex-col gap-2 ">
              <p>
                <span className="font-semibold">Population:</span> {country.population}
              </p>
              <p>
                <span className="font-semibold">Region:</span> {country.region}
              </p>
              <p>
                <span className="font-semibold">Capital:</span> {country.capital}
              </p>
            </div>
          </div>
        </div>
      ))}
    </main>
  );
}
