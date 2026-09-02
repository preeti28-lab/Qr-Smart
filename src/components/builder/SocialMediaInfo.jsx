import React, { useEffect, useRef, useState } from "react";
import { useWatch } from "react-hook-form";
import InputField from "../../common/fields/InputField";
import {
  FiFacebook,
  FiTwitter,
  FiInstagram,
  FiLinkedin,
  FiYoutube,
  FiTrash2,
} from "react-icons/fi";

const SocialMediaInfo = ({
  control,
  errors,
  setValue,
  getValues,
  onChange = () => {},
  value,
}) => {
  console.log(value)
  const values = useWatch({ control });

  const initializedRef = useRef(false);
  const [visiblePlatforms, setVisiblePlatforms] = useState({});

  // ============================================================
  // 1. Hydrate RHF + visibility TOGETHER, once data is available
  // ============================================================
  useEffect(() => {
    if (initializedRef.current) return;
    if (!value?.platforms) return;

    const platforms = value.platforms;
    const keys = Object.keys(platforms);
    if (keys.length === 0) return; // nothing to hydrate yet

    const initialVisible = {};

    keys.forEach((key) => {
      const platform = platforms[key] || {};
      setValue(`platforms.${key}.url`, platform.url || "", {
        shouldDirty: false,
        shouldTouch: false,
      });
      setValue(`platforms.${key}.text`, platform.text || "", {
        shouldDirty: false,
        shouldTouch: false,
      });

      if (platform.url || platform.text) {
        initialVisible[key] = true;
      }
    });

    setVisiblePlatforms(initialVisible);
    initializedRef.current = true;
  }, [value?.platforms, setValue]);

  // ============================================================
  // 2. Sync form changes back to parent (only after init)
  //    Only push the platforms slice, not the whole form state
  // ============================================================
  useEffect(() => {
    if (!initializedRef.current) return;

    const timeout = setTimeout(() => {
      onChange({ platforms: values?.platforms || {} });
    }, 300);

    return () => clearTimeout(timeout);
  }, [values?.platforms, onChange]);

  const socialPlatforms = [
    {
      key: "facebook",
      icon: <FiFacebook size={24} />,
      label: "Facebook",
      color: "#1877F2",
    },
    {
      key: "twitter",
      icon: <FiTwitter size={24} />,
      label: "Twitter",
      color: "#1DA1F2",
    },
    {
      key: "instagram",
      icon: <FiInstagram size={24} />,
      label: "Instagram",
      color: "#E1306C",
    },
    {
      key: "linkedin",
      icon: <FiLinkedin size={24} />,
      label: "LinkedIn",
      color: "#0077B5",
    },
    {
      key: "youtube",
      icon: <FiYoutube size={24} />,
      label: "YouTube",
      color: "#FF0000",
    },
  ];

  // ============================================================
  // 3. Toggle / Remove platform
  // ============================================================
  const togglePlatform = (key) => {
    setVisiblePlatforms((prev) => {
      const isVisible = prev[key];

      if (!isVisible) {
        // Opening: seed RHF if not already there
        setValue(`platforms.${key}.url`, value?.platforms?.[key]?.url || "");
        setValue(`platforms.${key}.text`, value?.platforms?.[key]?.text || "");
      }

      return { ...prev, [key]: !isVisible };
    });
  };

  const removePlatform = (key) => {
    setValue(`platforms.${key}`, undefined);
    setVisiblePlatforms((prev) => ({ ...prev, [key]: false }));
  };

  return (
    <div className="bg-white rounded-md space-y-4">
      {/* Icons */}
      <div className="flex gap-4">
        {socialPlatforms.map(({ key, icon, label, color }) => (
          <button
            key={key}
            type="button"
            onClick={() => togglePlatform(key)}
            className={`p-2 rounded-full transition ${
              visiblePlatforms[key] ? "bg-gray-100" : "bg-gray-50"
            }`}
            title={label}
            style={{ color }}
          >
            {icon}
          </button>
        ))}
      </div>

      {/* Inputs */}
      <div className="space-y-2 mt-3">
        {socialPlatforms.map(({ key, label }) =>
          visiblePlatforms[key] ? (
            <div
              key={key}
              className="flex flex-col gap-2 bg-gray-50 p-2 rounded-md"
            >
              <p className="text-base">{label}</p>

              <div className="w-full flex flex-wrap gap-3">
                <InputField
                  control={control}
                  errors={errors}
                  name={`platforms.${key}.url`}
                  type="text"
                  placeholder="URL"
                  className="flex-1"
                />

                <InputField
                  control={control}
                  errors={errors}
                  name={`platforms.${key}.text`}
                  type="text"
                  placeholder="Display Text"
                  className="flex-1"
                />

                <button
                  type="button"
                  onClick={() => removePlatform(key)}
                  className="text-red-500 hover:text-red-600 p-1 rounded-full"
                >
                  <FiTrash2 size={18} />
                </button>
              </div>
            </div>
          ) : null,
        )}
      </div>
    </div>
  );
};

export default SocialMediaInfo;
