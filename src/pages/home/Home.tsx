import CountryFilter from "./components/CountryFilter";
import MainContent from "./components/MainContent";

export default function Home() {

  return (
    <div className="flex flex-col min-h-screen bg-veryLightGray dark:bg-veryDarkBlue">
      <CountryFilter />
      <MainContent />
    </div>
  )
}
