import React from "react";
import CategoryTile from "../components/CategoryTile";

export default function Categories({ categories, tile }) {
  return (
    <ul className={`categories ${tile ? "tile" : ""}`}>
      {categories.map((item) => {
        return (
          <CategoryTile
            imgUrl={item?.category_icon?.url}
            name={item?.name}
            color={item?.categoryColor?.css}
          />
        );
      })}
    </ul>
  );
}
