import React, { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import InputField from "../../../common/fields/InputField";
import {
  FiFacebook,
  FiTwitter,
  FiInstagram,
  FiLinkedin,
  FiYoutube,
  FiTrash2,
} from "react-icons/fi";

const SocialMediaInfo = ({ onChange = () => {}, currentFormData }) => {
  const {
    control,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      platforms: currentFormData?.platforms || {},
    },
  });

  const values = useWatch({ control });

  useEffect(() => {
    const timeout = setTimeout(() => onChange(values), 300);
    return () => clearTimeout(timeout);
  }, [values, onChange]);

  // Social media platforms with brand colors
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

  const [visiblePlatforms, setVisiblePlatforms] = useState({});

  const togglePlatform = (key) => {
    setVisiblePlatforms((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const removePlatform = (key) => {
    setValue(`platforms.${key}`, undefined);
    setVisiblePlatforms((prev) => ({ ...prev, [key]: false }));
  };

  return (
    <div className="bg-white p-4 rounded-md  space-y-4">
      {/* <p className="text-md font-semibold mb-2">Social Media Links</p> */}

      {/* Icons */}
      <div className="flex gap-4">
        {socialPlatforms.map(({ key, icon, label, color }) => (
          <button
            key={key}
            type="button"
            onClick={() => togglePlatform(key)}
            className={`p-2 rounded-full transition-all duration-300 ease-in-out ${
              visiblePlatforms[key] ? "bg-gray-100" : "bg-gray-50"
            }`}
            title={label}
            style={{ color }}
          >
            {icon}
          </button>
        ))}
      </div>

      {/* Forms for visible platforms in single line */}
      <div className="space-y-2 mt-3">
        {socialPlatforms.map(({ key, label, color }) =>
          visiblePlatforms[key] ? (
            <div
              key={key}
              className="flex flex-col items-start gap-2 bg-gray-50 p-2 rounded-md"
            >
              <p className="text-base">{label}</p>

              <div className="w-full flex gap-3">
                <InputField
                  control={control}
                  errors={errors}
                  name={`platforms.${key}.url`}
                  type="text"
                  placeholder="URL"
                  className="flex-1"
                  defaultValue={currentFormData?.platforms?.[key]?.url || ""}
                />
                <InputField
                  control={control}
                  errors={errors}
                  name={`platforms.${key}.text`}
                  type="text"
                  placeholder="Display Text"
                  className="flex-1"
                  defaultValue={currentFormData?.platforms?.[key]?.text || ""}
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
