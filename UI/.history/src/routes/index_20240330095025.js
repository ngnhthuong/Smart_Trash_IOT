import Login from "../pages/login/Login";
import Signup from "../pages/signup/Signup";
import Home from "../pages/main/Home";
// dont need login to view
const publicRoutes = [
  { path: "/", component: Home },
  { path: "/login", component: Login },
  { path: "/signup", component: Signup },
];

export { publicRoutes };
