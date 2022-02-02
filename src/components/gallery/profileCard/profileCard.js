import React from "react";
import { Link } from "react-router-dom";
import "./profileCard.css";

export default function ProfileCard({ item }) {
  return (
    <Link to={`/profile/${item.login.uuid}`} state={{ item }}>
      <div className="col-md-4 mt-3 col-lg-6 imgContainer">
        <img
          className="rounded"
          alt={`${item.name.first} ${item.name.last}`}
          src={item.picture.large}
        />
        <div className="textOverImg">
          {item.name.first}, {item.dob.age} År
        </div>
      </div>
    </Link>
  );
}
