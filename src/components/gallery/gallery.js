import React, { useState, useEffect } from "react";
import { getExtProfiles, getIntProfiles } from "../apiCore/ApiCore";
import "./gallery.css";
import { Link } from "react-router-dom";
import Profilecard from "./profileCard/profileCard";
let totalHits = 0;

export default function Gallery(props) {
  const [profiles, setProfiles] = useState([]);
  const [error, setError] = useState(false);
  let [amount, setAmount] = useState(20);
  const [filteredData, setFilteredData] = useState(profiles);
  const [disabledButton, setDisabledButton] = useState(false);

  function GalleryList({ items, fallback, error }) {
    if (!items || items.length === 0) {
      return (
        <div className="text-center w-100">
          <p>{fallback}</p>
        </div>
      );
    } else if (error) {
      return <div>{error}</div>;
    } else {
      return items.map((item) => {
        return (
          <div key={item.login.uuid}>
            <Profilecard item={item} />
          </div>
        );
      });
    }
  }

  const init = () => {
    callOnProfiles(amount);
  };
  const handleSearch = (event) => {
    let value = event.target.value.toString().toLowerCase();
    let result = [];
    result = profiles.filter((data) => {
      return (
        data.name.first.toLowerCase().search(value) !== -1 ||
        data.dob.age.toString().search(value) !== -1
      );
    });
    setFilteredData(result);
  };

  const callOnProfiles = (amount) => {
    setDisabledButton(true);
    getExtProfiles(amount).then((data) => {
      totalHits = totalHits + +data.results.length;
      if (data.results.length < totalHits) {
        setProfiles(profiles.concat(data.results));
        setFilteredData(profiles.concat(data.results));
      } else {
        setProfiles(data.results);
        setFilteredData(data.results);
      }
      setDisabledButton(false);
    });
  };

  const showMoreProfiles = () => {
    callOnProfiles(amount);
    setAmount(amount);
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <div>
      <Link to={"/createProfile"}>
        <i className="bi bi-plus bi-9x circle-icon"></i>
      </Link>

      <div className="row text-center">
        <h1 className="h1">Stefans Galleri</h1>
        <label htmlFor="searchInput" className="form-label">
          Sök:
        </label>
        <div className="col-6 mx-auto">
          <input
            id="searchInput"
            className=" form-control"
            placeholder="Sök efter namn eller ålder"
            type="text"
            onChange={(event) => handleSearch(event)}
          />
        </div>
      </div>
      <div className="container">
        <div className="row row-cols-3 row-cols-sm-2 row-cols-md-4">
          <GalleryList
            items={filteredData}
            fallback={"Loading..."}
            error={error}
          />
        </div>
      </div>
      <div className="header">
        <button
          type="button"
          disabled={disabledButton}
          id="moreBtn"
          className="btn btn-success mb-2 mt-2"
          onClick={showMoreProfiles}
        >
          Hämta fler profiler
        </button>
      </div>
    </div>
  );
}
