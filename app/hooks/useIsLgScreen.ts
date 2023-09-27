import { useState, useEffect } from "react";

// Define your large screen breakpoint (you can adjust this as needed)
const LG_SCREEN_BREAKPOINT = 1024;

const useIsLgScreen = () => {
  const [isLgScreen, setIsLgScreen] = useState(
    window.matchMedia(`(min-width: ${LG_SCREEN_BREAKPOINT}px)`).matches
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia(
      `(min-width: ${LG_SCREEN_BREAKPOINT}px)`
    );

    const handleMediaChange = (e: MediaQueryListEvent) => {
      setIsLgScreen(e.matches);
    };

    mediaQuery.addEventListener("change", handleMediaChange);

    // Clean up the event listener when the component unmounts
    return () => {
      mediaQuery.removeEventListener("change", handleMediaChange);
    };
  }, []);

  return isLgScreen;
};

export default useIsLgScreen;
