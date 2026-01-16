import styles from "./Homepage.module.css";
import { Link } from "react-router-dom";
import NavBar from "../components/NavBar.jsx";

export default function Homepage() {
  return (
    <main className={styles.homepage}>
      <NavBar />
      <section>
        <h1>
          Do you like travelling?
          <br />
          Keep track of your adventures.
        </h1>
        <h2>
          A diary that tracks your destinations. Never forget your life changing
          experiences.
        </h2>
        <Link to="/app" className="cta">
          Start Tracking Now
        </Link>
      </section>
    </main>
  );
}
