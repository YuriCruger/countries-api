import { dataType } from "types/dataType";
import axios from "axios"
import { Router } from "./Router";
import { BrowserRouter, Outlet } from "react-router-dom";
import Header from "./components/Header";

export const fetchData = async (): Promise<dataType[]> => {
  const { data } = await axios.get('https://api.npoint.io/5e0cebc096329966ec05');
  return Object.values(data) as dataType[];
};

function App() {
  return (
    <div className="font-sans">
      <BrowserRouter>
        <Outlet />
        <Header />
        <Router />
      </BrowserRouter>
    </div>
  )
}

export default App
