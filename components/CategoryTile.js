import React from "react";

export default function CategoryTile({ imgUrl, name, color }) {
  return (
    <li className="category-tile">
      <picture>
        <img src={imgUrl} />
      </picture>
      <span style={{ color: "#131313" }}>{name}</span>
    </li>
  );
}
