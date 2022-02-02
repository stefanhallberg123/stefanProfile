import React from "react";
import { Link } from "react-router-dom";
import { useLocation } from 'react-router-dom'
import "./singleProfile.css"

export default function SingleProfile() {
    
  const location = useLocation()
  const { item } = location.state
  return (
    <div>
      <Link to={"/"}><i className="bi bi-arrow-left"></i></Link>
    <div className="text-center">
      <img alt={`${item.name.first} ${item.name.last}`} src={item.picture.large} className="rounded mt-2" />
      <h2 className="mt-2">Namn: {item.name.title} {item.name.first} {item.name.last}</h2>
      <h3 className="mt-2">Ålder: {item.dob.age}</h3>
      <h6 className="mt-2">Land: {item.location.country}</h6>
    </div>
    </div>
  );
}
