import {createBrowserRouter} from "react-router-dom";
import App from "../App";
import Banner from "../components/Banner"
import About from "../Pages/About";
import Home from "../Pages/Home";


const router = createBrowserRouter([
    {
      path: "/",
      element: <App/>,
      children: [
        {path: "/",
            element: <Banner/>
        },
        {path: "/about",
            element: <About/>
        }
      ]
    },
  ]);

export default router;
