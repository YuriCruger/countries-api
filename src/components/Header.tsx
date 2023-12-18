import { Moon, SunMoon } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Header() {
  const [darkMode, setDarkMode] = useState(false)

  function toTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }

  function handleTheme() {
    document.documentElement.classList.toggle("dark")
    setDarkMode(!darkMode)
  }

  return (
    <header className="z-50 px-6 py-8 fixed w-full bg-white shadow-md dark:bg-darkBlue sm:px-10 lg:px-14 xl:px-20 2xl:px-52">
      <nav className="flex items-center justify-between">
        <Link to={"/"}>
          <div
            onClick={toTop}
            className="font-bold cursor-pointer dark:text-white lg:text-2xl xl:text-3xl">Where in the world?
          </div>
        </Link>

        <div
          onClick={handleTheme}
          className="flex items-center gap-2 cursor-pointer rounded-md p-2 hover:bg-lightGray duration-300 easy-in-out dark:hover:bg-lightDarkBlue">
          {darkMode ? <SunMoon className="text-white" /> : <Moon />}

          <p className="font-bold text-sm dark:text-white">{darkMode ? 'Light Mode' : 'Dark Mode'}</p>
        </div>
      </nav>
    </header>
  )
}
