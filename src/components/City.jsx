import styles from "./City.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { useCities } from "../context/CitiesContext.jsx";
import { useEffect } from "react";
import Spinner from "./Spinner.jsx";
import Button from "./Button.jsx";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));

function City() {
  const { id } = useParams();
  const { getCity, currentCity, isLoading } = useCities();

  const navigate = useNavigate();

  useEffect(
    function () {
      getCity(id);
    },
    [id],
  );

  const { cityName, emoji, date, notes } = currentCity;

  if (isLoading) return <Spinner />;

  return (
    <div className={`${styles.city} no-scrollbar`}>
      <div className={styles.row}>
        <h6>{cityName}</h6>
        <h3>
          <span className="flag-emoji">{emoji}</span>
          {cityName}
        </h3>
      </div>
      <div className={styles.row}>
        <h6>You went to {cityName} on</h6>
        <p>{formatDate(date || null)}</p>
      </div>
      {notes && (
        <div className={styles.row}>
          <h6>Your Notes</h6>
          <p>{notes}</p>
        </div>
      )}
      <div className={styles.row}>
        <h6>Learn More</h6>
        <a href={`https://en.wikipedia.org/wiki/${cityName}`}>
          Check out {cityName} on Wikipedia
        </a>
      </div>
      <Button
        type="back"
        onClick={(e) => {
          e.preventDefault();
          navigate(-1);
        }}
      >
        &larr; Back
      </Button>
    </div>
  );
}

export default City;
