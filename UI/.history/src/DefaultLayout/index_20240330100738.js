import "./layout.css";
import Home from "../pages/Home/Home";
export default function DefaultLayout({ children }) {
  return (
    <div className="main">
      <Home />
    </div>
  );
}
