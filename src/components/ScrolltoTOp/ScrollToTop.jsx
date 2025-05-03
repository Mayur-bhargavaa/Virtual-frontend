import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant", // can change to "smooth" if you want nice animation
    });
  }, [pathname]);

  return null;
};

export default ScrollToTop;
