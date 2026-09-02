import React, { useState } from "react";
import EmptyPreview from "../../../components/ui/EmptyPreview";
import { FaStar, FaRegStar } from "react-icons/fa";
import { FiMessageCircle } from "react-icons/fi";
import { getContrastColor } from "../../../utils";

const PreviewScreen = ({ currentFormData, isScanPage = false, isEditMode }) => {
  const bgColor = currentFormData?.bannerColor || "#f3f4f6";
  console.log(currentFormData);

  const textColor = getContrastColor(bgColor);

  const isEmptyValue = (value) => {
    if (value === null || value === undefined) return true;

    if (typeof value === "string") return value.trim() === "";

    if (Array.isArray(value)) {
      return value.length === 0 || value.every(isEmptyValue);
    }

    if (typeof value === "object") {
      return (
        Object.keys(value).length === 0 ||
        Object.values(value).every(isEmptyValue)
      );
    }

    return false;
  };

  const hasAnyValue = Object.values(currentFormData || {}).some(
    (value) => !isEmptyValue(value),
  );

  if (!hasAnyValue) {
    return <EmptyPreview />;
  }

  const {
    categories = [],
    description,
    name,
    title,
    assessment,
    assessmentType, // "rating" or "yesNo"
    website,
  } = currentFormData || {};

  // State for ratings, yes/no selections & comments
  const [ratings, setRatings] = useState({});
  const [yesNo, setYesNo] = useState({});
  const [commentsOpen, setCommentsOpen] = useState({});
  const [comments, setComments] = useState({});

  const handleRating = (catIndex, subIndex, value) => {
    const key = `${catIndex}-${subIndex}`;
    setRatings((prev) => ({ ...prev, [key]: value }));
  };

  const handleYesNo = (catIndex, subIndex, value) => {
    const key = `${catIndex}-${subIndex}`;
    setYesNo((prev) => ({ ...prev, [key]: value }));
  };

  const toggleComment = (catIndex, subIndex) => {
    const key = `${catIndex}-${subIndex}`;
    setCommentsOpen((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleCommentChange = (catIndex, subIndex, value) => {
    const key = `${catIndex}-${subIndex}`;
    setComments((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="min-h-full" style={{ backgroundColor: bgColor }}>
      <h2
        className="text-lg font-semibold text-center pt-5"
        style={{ color: textColor }}
      >
        {name}
      </h2>

      <div className="bg-white rounded-tl-2xl rounded-tr-2xl py-4 px-3 mt-4 space-y-4">
        <p className="text-sm font-semibold">{title}</p>
        <p className="text-xs">{description}</p>

        {/* Categories */}
        {categories.map((cat, catIndex) => (
          <div key={catIndex} className="border rounded-xl p-3 space-y-3">
            {/* Category Header */}
            <div>
              <p className="font-semibold text-xs">{cat.categoryName}</p>
              <p className="text-[10px] text-gray-500">{cat.description}</p>
            </div>

            {/* Subcategories */}
            {cat.subcategories?.map((sub, subIndex) => {
              const key = `${catIndex}-${subIndex}`;
              const currentRating = ratings[key] || 0;
              const currentYesNo = yesNo[key] || "";

              return (
                <div key={subIndex}>
                  {/* Row */}
                  <div className="flex flex-col items-start justify-between">
                    <p className="text-xs font-semibold">{sub.name}</p>

                    <div className="flex items-center mt-2 w-full justify-between gap-2">
                      {/* Assessment Display */}
                      {assessmentType === "rating" && assessment && (
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star) =>
                            star <= currentRating ? (
                              <FaStar
                                key={star}
                                size={12}
                                className="text-yellow-400 cursor-pointer"
                                onClick={() =>
                                  handleRating(catIndex, subIndex, star)
                                }
                              />
                            ) : (
                              <FaRegStar
                                key={star}
                                size={12}
                                className="text-gray-300 cursor-pointer"
                                onClick={() =>
                                  handleRating(catIndex, subIndex, star)
                                }
                              />
                            ),
                          )}
                        </div>
                      )}

                      {assessmentType === "yesNo" && assessment && (
                        <div className="flex gap-2">
                          <button
                            className={`px-2 py-1 text-xs border rounded ${
                              currentYesNo === "yes"
                                ? "bg-blue-500 text-white"
                                : "bg-gray-100 text-gray-800"
                            }`}
                            onClick={() =>
                              handleYesNo(catIndex, subIndex, "yes")
                            }
                          >
                            Yes
                          </button>
                          <button
                            className={`px-2 py-1 text-xs border rounded ${
                              currentYesNo === "no"
                                ? "bg-blue-500 text-white"
                                : "bg-gray-100 text-gray-800"
                            }`}
                            onClick={() =>
                              handleYesNo(catIndex, subIndex, "no")
                            }
                          >
                            No
                          </button>
                        </div>
                      )}

                      {/* Comment Icon */}
                      {currentFormData?.comments && (
                        <FiMessageCircle
                          className="cursor-pointer text-gray-500"
                          onClick={() => toggleComment(catIndex, subIndex)}
                        />
                      )}
                    </div>
                  </div>

                  {/* Comment Input */}
                  {commentsOpen[key] && (
                    <input
                      type="text"
                      placeholder="Write a review..."
                      value={comments[key] || ""}
                      onChange={(e) =>
                        handleCommentChange(catIndex, subIndex, e.target.value)
                      }
                      className="w-full border rounded-md px-2 py-1 text-xs mt-2"
                    />
                  )}
                </div>
              );
            })}
          </div>
        ))}
        <div className="flex flex-col gap-3 justify-center">
          <button
            className="rounded-full text-xs w-max mx-auto px-3 py-2 "
            style={{ backgroundColor: bgColor, color: textColor }}
          >
            Send Feedback
          </button>
          <a href={website} target="blank" className="text-xs text-center">
            {website}
          </a>
        </div>
      </div>
    </div>
  );
};

export default PreviewScreen;
