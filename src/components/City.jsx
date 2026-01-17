import styles from "./City.module.css";
import { useParams } from "react-router-dom";

function City() {
  const { id } = useParams();
  return <h1>CITY-{id}</h1>;
}

export default City;
