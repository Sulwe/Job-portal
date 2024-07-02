import {createBrowserRouter} from "react-router-dom";
import App from "../App";
import Banner from "../components/Banner"
import About from "../Pages/About";
import Home from "../Pages/Home";
import CreateJob from "../Pages/CreateJob";
import MyJobs from "../Pages/MyJobs";


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
      ]
    },
  ]);

export default router;
