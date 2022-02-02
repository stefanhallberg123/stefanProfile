import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiCreateProfile, getCountries } from "../apiCore/ApiCore";

export default function CreateProfile() {
  const [countries, setCountries] = useState([]);
  const [error, setError] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState("Laddar...");
  const [validationText, setValidationText] = useState(
    "Du måste fylla i alla fält!"
  );
  const [showValidationText, setShowValidationText] = useState(false);

  const [values, setValues] = useState({
    first: "",
    last: "",
    title: "Mr",
    age: "",
    gender: "Man",
    country: "Afghanistan",
    large: "",
    formData: [],
  });
  const { first, last, title, age, gender, country, large, formData } = values;
  const handleChange = (name) => (event) => {
    const value = name === "large" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };
  useEffect(() => {
    initCreate();
  }, []);

  const submitProfile = (event) => {
    event.preventDefault();
    if (first === "" || last === "" || age === "" || large === "") {
      setShowValidationText(true);
    } else {
      setShowValidationText(false);
      apiCreateProfile(formData).then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error });
        } else {
          setValues({
            first: "",
            last: "",
            title: "Mr",
            age: "",
            gender: "Man",
            country: "Afghanistan",
            large: "",
            formData: new FormData(),
          });
        }
      });
    }
  };

  const initCreate = () => {
    setDisabled(true);
    setLoading("Laddar...");
    getCountries().then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        data = data.sort((a, b) => (a.name.common > b.name.common ? 1 : -1));
        setCountries(data);
        setDisabled(false);
        setLoading("");
        setValues({
          ...values,
          formData: new FormData()
        });
      }
    });
  };

  const showValidationTextContainer = () => (
    <div
      className="alert alert-danger"
      style={{ display: showValidationText ? "" : "none" }}
    >
      {validationText}
    </div>
  );

  return (
    <div>
      <Link to={"/"}>
        <i className="bi bi-arrow-left"></i>
      </Link>

      <div className="text-center">
        <h1>Skapa Profil</h1>
      </div>
      <form onSubmit={submitProfile} className="form">
        <label>Kön</label>
        <div className="form-group mt-2">
          <select
            onChange={handleChange("gender")}
            value={gender}
            className="form-control"
          >
            <option value="Man">Man</option>
            <option value="Kvinna">Kvinna</option>
            <option value="Annan">Annan</option>
          </select>
        </div>
        <div className="form-group mt-2">
          <label>Förnamn</label>
          <input
            onChange={handleChange("first")}
            value={first}
            className="form-control"
            name="firstname"
            type="text"
          />
        </div>
        <div className="form-group mt-2">
          <label>Efternamn</label>
          <input
            onChange={handleChange("last")}
            value={last}
            className="form-control"
            name="lastname"
            type="text"
          />
        </div>
        <div className="form-group mt-2">
          <label>Ålder</label>
          <input
            onChange={handleChange("age")}
            value={age}
            className="form-control"
            name="age"
            type="number"
          />
        </div>
        <div className="form-group mt-2">
          <label>Titel</label>
          <select
            onChange={handleChange("title")}
            value={title}
            className="form-control"
          >
            <option value="Mr">Mr</option>
            <option value="Ms">Ms</option>
            <option value="Doc">Doc</option>
          </select>
        </div>
        <div className="form-group mt-2">
          <div>{loading}</div>
          <label>Land</label>
          <select
            onChange={handleChange("country")}
            value={country}
            className="form-control"
            disabled={disabled}
          >
            {countries &&
              countries.map((country, i) => (
                <option value={country.name.common} key={i}>
                  {country.name.common}
                </option>
              ))}
          </select>
        </div>
        <div className="form-group mt-2">
          <label>Profilbild</label>
          <input
            onChange={handleChange("large")}
            accept="image/*"
            name="large"
            className="form-control"
            type="file"
          />
        </div>
        <div className="text-center mt-2">
          {showValidationTextContainer()}
          <button
            className="btn btn-lg btn-primary mt-2"
            disabled={disabled}
            type="submit"
          >
            Skapa
          </button>
        </div>
      </form>
    </div>
  );
}
