import { useScrollPosition } from "@n8tb1t/use-scroll-position";
import { useState } from "react";

export const Author = () => {
  const [isSticky, setIsSticky] = useState(false);

  useScrollPosition(({ prevPos, currPos }) => {
    if (currPos.y > -100) {
      setIsSticky(false);
    } else {
      setIsSticky(true);
    }
  });

  return (
    <>
      <div className={`author-container ${isSticky ? "sticky" : ""}`}>
        <div className={`author ${isSticky ? "sticky" : ""}`}>
          <div className="container">
            <picture>
              <img src="/assets/author/ernest.jpeg" />
            </picture>
            <div className="description">
              <p className="name">Ernest Rudziec</p>
              <p className="role">
                Front-end Developer
                <br /> &&nbsp;UI/UX Designer
              </p>
            </div>
          </div>
          <p className="bio">
            Pasjonat szeroko pojętegu digitalu i&nbsp;reklamy, student
            informatyki i&nbsp;pełnoetatowy programista. Na codzień gadam po
            javascriptowemu w Wirtualnej Polsce tworząc i&nbsp;usprawniając
            działanie interfejsów poczty wp i&nbsp;o2.
          </p>
        </div>
      </div>
      <div className={`author-placeholder ${isSticky ? "active" : ""}`} />
    </>
  );
};
