import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// React Router does a client-side navigation on every route change, which
// does NOT reset scroll position the way a traditional full page load does.
// Without this, clicking a link while scrolled down a page (e.g. a card in
// a carousel further down the homepage) opens the destination page already
// scrolled to wherever the browser happens to leave it — usually the same
// scroll offset as the page you navigated from.
//
// Mounted once in AppProvider, inside <BrowserRouter>, so it applies to
// every route in the app without needing a per-page useEffect + scrollTo.
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default ScrollToTop;