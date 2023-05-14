import spinner from "../../assets/svg/spinner.svg";
import "./Spinner.scss";

export default function Spinner() {
  return (
    <div className="spinner">
      <div>
        <img src={spinner} alt="Loading..." className="spinner__img" />
      </div>
    </div>
  );
}
