import { useEffect, useState } from "react";
import { scrollToTop } from "../../../utils/helperFunctions";

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
      className={`absolute bottom-8 -right-4 bg-red-600 py-2 px-4 text-white rounded-lg ${
        isVisible ? "visible" : "hidden"
      }`}
      onClick={scrollToTop}
    >
      <i className="fa-solid fa-arrow-up"></i>
    </button>
  );
};
