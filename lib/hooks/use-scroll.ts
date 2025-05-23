import { useEffect, useState } from "react";

export const useScroll = (threshold: number = 0) => {
  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = () => setIsScrolled(window.scrollY > threshold);

  useEffect(() => {
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold]);

  return { isScrolled, setIsScrolled };
};
