import { useEffect, useState } from "react";

export default function ScrollToTopButton() {
  const [showScrollToTop, setShowScrollToTop] = useState(() => window.scrollY > 480);

  useEffect(() => {
    const updateScrollControl = () => setShowScrollToTop(window.scrollY > 480);
    updateScrollControl();
    window.addEventListener("scroll", updateScrollControl, { passive: true });
    return () => window.removeEventListener("scroll", updateScrollControl);
  }, []);

  if (!showScrollToTop) return null;

  return (
    <a className="scroll-to-top" href="#top" aria-label="Scroll to the top">
      <span aria-hidden="true">↑</span>
    </a>
  );
}
