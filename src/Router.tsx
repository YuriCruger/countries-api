import { Route, Routes } from "react-router-dom"
import CountryProfile from "./pages/country/CountryProfile"
import Home from "./pages/home/Home"
import { useAppSelector } from "app/hooks";

export function Router() {
    const currentCountry = useAppSelector((state) => state.data.currentCountry);

    return (
        <div>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path={`/${currentCountry?.alpha3Code}`} element={<CountryProfile />} />
            </Routes>
        </div>
    )
}
