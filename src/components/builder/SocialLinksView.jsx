import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";

const SocialLinksView = ({ platforms = {}, iconColor = "#000" }) => {
  const iconMap = {
    facebook: FaFacebookF,
    twitter: FaTwitter,
    instagram: FaInstagram,
    linkedin: FaLinkedinIn,
    youtube: FaYoutube,
  };

  return (
    <div className="flex items-center justify-center gap-3 mt-3 pb-5">
      {Object.keys(platforms).map((key) => {
        const platform = platforms[key];
        const Icon = iconMap[key];

        // Skip if no url or icon not found
        if (!platform?.url || !Icon) return null;

        return (
          <a
            key={key}
            href={platform.url}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-80 transition"
          >
            <Icon size={18} style={{ color: iconColor }} />
          </a>
        );
      })}
    </div>
  );
};

export default SocialLinksView;
