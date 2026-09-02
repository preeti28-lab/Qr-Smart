import React from "react";
import { useNavigate } from "react-router-dom";

const FooterLink = ({ children, linkTo }) => {
  const navigate = useNavigate();

  const handleClick = (e) => {
    // Let the browser handle modified clicks normally (open in new tab,
    // new window, etc.) instead of hijacking them.
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) {
      return;
    }

    e.preventDefault();

    // Already at the top — just navigate, nothing to scroll.
    if (window.scrollY === 0) {
      navigate(linkTo);
      return;
    }

    // React Router doesn't reset scroll position on navigation, so clicking
    // a footer link while scrolled down (the footer is always at the
    // bottom of the page) opens the destination still scrolled down.
    // Smooth-scroll the current page to the top first, then navigate once
    // that's finished — navigating immediately would unmount the page
    // before the smooth scroll had any time to actually be seen.
    // Scoped to footer links only — not app-wide.
    window.scrollTo({ top: 0, behavior: "smooth" });

    let lastY = window.scrollY;
    let settledFrames = 0;

    const checkScrollEnd = () => {
      const currentY = window.scrollY;

      // Wait for scroll position to stop changing for a couple of
      // consecutive frames, rather than a fixed timeout, so this works
      // regardless of how far down the page the click happened.
      if (currentY === lastY) {
        settledFrames += 1;
      } else {
        settledFrames = 0;
      }
      lastY = currentY;

      if (settledFrames >= 2 || currentY === 0) {
        navigate(linkTo);
        return;
      }

      requestAnimationFrame(checkScrollEnd);
    };

    requestAnimationFrame(checkScrollEnd);
  };

  return (
    <>
      <a href={linkTo} onClick={handleClick}>
        <p className="cursor-pointer text-[13.5px] font-medium text-slate-400 transition-colors duration-200 hover:text-white active:text-blue-300">
          {children}
        </p>
      </a>
    </>
  );
};

export default FooterLink;