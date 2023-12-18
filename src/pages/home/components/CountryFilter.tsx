import { useEffect, useState, useRef } from 'react';
import { ChevronDown, Search } from 'lucide-react';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { setRegion, setInputValue } from 'features/data/dataSlice';

export const regionOptions = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];

export default function CountryFilter() {
  const [options, setOptions] = useState(false);
  const optionsRef = useRef<HTMLDivElement>(null);

  const region = useAppSelector((state) => state.data.region);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (optionsRef.current && !optionsRef.current.contains(event.target as Node)) {
        setOptions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [optionsRef]);

  useEffect(() => {
    dispatch(setRegion('Filter by Region'));
  }, [dispatch]);

  return (
    <div className="pt-32 px-4 sm:px-10 lg:px-14 xl:px-20 2xl:px-52">
      <div className="flex flex-col gap-6 lg:flex-row lg:justify-between">
        <div className="flex items-center bg-white px-10 py-4 rounded-md shadow-md dark:bg-darkBlue lg:w-3/6">
          <Search className="cursor-pointer text-darkGray" />
          <input
            type="text"
            placeholder="Search for a country..."
            className="ml-4 focus:outline-none w-full dark:bg-darkBlue text-darkGray"
            onChange={(event) => dispatch(setInputValue(event.target.value))}
          />
        </div>

        <div
          onClick={() => setOptions(true)}
          className="relative z-0 flex items-center justify-between cursor-pointer w-3/6 px-4 py-3 bg-white shadow-md rounded-md dark:bg-darkBlue dark:text-white lg:w-60"
        >
          <span>{region}</span>
          <ChevronDown className="cursor" />
          {options && (
            <div ref={optionsRef} className="w-full absolute bg-white top-16 left-0 flex flex-col px-4 py-3 rounded-md shadow-md dark:bg-darkBlue">
              {regionOptions.map((option) => (
                <span
                  key={option}
                  onClick={() => dispatch(setRegion(option))}
                  className="rounded-md hover:bg-lightGray p-2 dark:hover:bg-lightDarkBlue"
                >
                  {option}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
