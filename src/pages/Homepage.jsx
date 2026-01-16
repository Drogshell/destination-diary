import NavBar from "../components/NavBar.jsx";
import { Link } from "react-router-dom";

function Homepage() {
  return (
    <div>
      <NavBar />
      <h1>Homepage 🏠</h1>
      <Link to="/app">Main App</Link>
    </div>
  );
}

export default Homepage;
