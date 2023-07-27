import { useEffect, useState } from "react";
import { scrollToTop } from "../../../utils/helperFunctions";
import classNames from "classnames";

export const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const handleScroll = () => {
    const scrollTop = document.documentElement.scrollTop;

    if (scrollTop > 500) {
      setIsVisible(true);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <button
      className={classNames(
        "absolute",
        "bottom-8",
        "-right-4",
        "px-4",
        "navigation-button",
        {
          visible: isVisible,
          hidden: !isVisible,
        }
      )}
      onClick={scrollToTop}>
      <i className="fa-solid fa-arrow-up" />
    </button>
  );
};
