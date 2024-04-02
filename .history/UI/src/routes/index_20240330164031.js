import Login from "../pages/login/Login";
import Signup from "../pages/signup/Signup";
import Home from "../pages/Home/Home";
// dont need login to view
const publicRoutes = [
  { path: "/login", component: Login },
  { path: "/home", component: Home },
  { path: "/signup", component: Signup },
];

export { publicRoutes };
