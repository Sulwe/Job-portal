import {createBrowserRouter} from "react-router-dom";
import App from "../App";
import Banner from "../components/Banner"
import About from "../Pages/About";
import Home from "../Pages/Home";
import CreateJob from "../Pages/CreateJob";
import MyJobs from "../Pages/MyJobs";
import SalaryEst from "../Pages/SalaryEst";


const router = createBrowserRouter([
    {
      path: "/",
      element: <App/>,
      children: [
        {path: "/",
            element: <Home/>
        },
        {path: "/post-job",
            element: <CreateJob/>
        },
        {path: "/my-jobs",
          element: <MyJobs/>
        },
        {path: "/salary",
          element: <SalaryEst/>
        },
      ]
    },
  ]);

export default router;
