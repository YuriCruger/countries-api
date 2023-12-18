import { useAppDispatch, useAppSelector } from "app/hooks";
import { setCurrentCountry } from "features/data/dataSlice";
import { ArrowLeft } from "lucide-react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { fetchData } from "../../App";
import { dataType } from "types/dataType";

export default function CountryProfile() {
    const { data } = useQuery<dataType[]>("repos", fetchData, {
        staleTime: 1000 * 60, // 1 minute
    });
    function findCountryByCode(countryCode: string): dataType | null {

        const foundCountry = data?.find((country) => country.alpha3Code === countryCode);

        return foundCountry || null;
    }

    const currentCountry = useAppSelector((state) => state.data.currentCountry);

    const dispatch = useAppDispatch();

    function navigateToBorderCountry(border: string) {
        const borderCountry = findCountryByCode(border);

        if (borderCountry) {
            dispatch(setCurrentCountry(borderCountry));
        }
    }

    return (
        <div className="min-h-screen py-28 px-6 sm:px-10 lg:px-14 xl:px-20 2xl:px-52 bg-veryLightGray dark:bg-veryDarkBlue xl:overflow-hidden">
            <Link to={"/"}>
                <button className="flex items-center gap-1 bg-white hover:bg-lightGray rounded-md shadow-md px-5 py-3 mt-5 dark:bg-darkBlue dark:text-white dark:hover:bg-lightDarkBlue">
                    <ArrowLeft /> Back
                </button>
            </Link>

            {currentCountry &&
                <div className="mt-10 lg:flex lg:items-center dark:text-white">
                    <div className="mb-8">
                        <img src={currentCountry.flag} alt={`Flag of ${currentCountry.name}`} className="w-5/6 max-w-sm lg:max-w-2xl shadow-md" />
                    </div>

                    <div>
                        <div className="lg:flex lg:items-center lg:gap-16 lg:mb-10">
                            <div className="flex flex-col gap-3">
                                <h2 className="font-bold text-2xl mb-5">{currentCountry.name}</h2>
                                <div><span className="font-semibold">Native Name:</span> {currentCountry.nativeName}</div>
                                <div><span className="font-semibold">Population:</span> {currentCountry.population}</div>
                                <div><span className="font-semibold">Region:</span> {currentCountry.region}</div>
                                <div><span className="font-semibold">Sub Region:</span> {currentCountry.subregion}</div>
                                <div className="flex gap-1">
                                    <span className="font-semibold">Capital:</span>
                                    {currentCountry.capital ? (
                                        currentCountry.capital
                                    ) : (
                                        <p className="font-normal">No capital information available.</p>
                                    )}
                                </div>
                            </div>

                            <div className="flex flex-col gap-3 my-8">
                                <p><span className="font-semibold">Top Level Domain:</span> {currentCountry.topLevelDomain}</p>
                                <div className="flex gap-1 max-xl:flex-col">
                                    <span className="font-semibold">Currencies:</span>
                                    {currentCountry.currencies ? (
                                        currentCountry.currencies.map((cu) => cu.name)
                                    ) : (
                                        <p className="font-normal">No currency information available.</p>
                                    )}
                                </div>

                                <div><span className="font-semibold">Languages:</span> {currentCountry.languages.map((lang) => lang.name)}</div>
                            </div>
                        </div>


                        <div>
                            <div className="flex flex-wrap gap-4 mt-3 items-center">
                                <span className="font-bold text-lg">
                                    Border Countries:
                                    {!currentCountry.borders && <p className="font-normal text-base">This country has no known borders.</p>}
                                </span>
                                {currentCountry.borders?.map((border) => (
                                    <Link key={border} to={`/${border}`}>
                                        <button
                                            className="bg-white hover:bg-lightGray rounded-md shadow-md px-5 py-3 dark:bg-darkBlue dark:text-white dark:hover:bg-lightDarkBlue break-all"
                                            onClick={() => navigateToBorderCountry(border)}
                                        >
                                            {border}
                                        </button>
                                    </Link>

                                ))}
                            </div>

                        </div>
                    </div>

                </div>
            }
        </div>
    )
}
