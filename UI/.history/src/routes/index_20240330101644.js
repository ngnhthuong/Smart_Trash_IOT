import Login from "../pages/login/Login";
import Signup from "../pages/signup/Signup";
import Home from "../pages/Home/Home";
// dont need login to view
const publicRoutes = [
  { path: "/", component: Home },
  { path: "/signup", component: Signup },
  { path: "/login", component: Login },
];

export { publicRoutes };
