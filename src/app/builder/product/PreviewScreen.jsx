import React, { useEffect, useRef, useState } from "react";
import EmptyPreview from "../../../components/ui/EmptyPreview";

import {
  allergyImages as allergyIcons,
  certificates as certificateIcons,
  organic as organicIcons,
  consumption as consumptionIcons,
  recycleStamps as recycleIcons,
} from "./constant";
import { useDispatch } from "react-redux";
import { getThePDFPrevImage } from "../../../redux/features/qrcodes";

const PreviewScreen = ({ currentFormData, isScanPage, isEditMode }) => {
  const dispatch = useDispatch();

  const [imageSrc, setImageSrc] = useState(null);

  const fetchedRef = useRef({});
  const fetchingRef = useRef(new Set());

  const bgColor = currentFormData?.bannerColor || "#f3f4f6";

  // ─── Image loading ────────────────────────────────────────────────
  useEffect(() => {
    let localBlobUrl = null;

    // 🔹 SCAN MODE
    if (isScanPage) {
      const rawUrl = currentFormData?.imageUrl;
      if (!rawUrl) { setImageSrc(null); return; }

      const fileName = rawUrl.split("/").pop();

      if (fetchedRef.current[fileName]) {
        setImageSrc(fetchedRef.current[fileName]);
        return;
      }
      if (fetchingRef.current.has(fileName)) return;
      fetchingRef.current.add(fileName);

      dispatch(
        getThePDFPrevImage(fileName, (err, blob) => {
          fetchingRef.current.delete(fileName);
          if (!err && blob) {
            const url = URL.createObjectURL(blob);
            fetchedRef.current[fileName] = url;
            setImageSrc(url);
          } else {
            setImageSrc(null);
          }
        }),
      );
      return;
    }

    const imgItem = currentFormData?.profileImg?.[0];

    // 🔹 NEW UPLOAD — user just picked a file (create or edit mode)
    if (imgItem?.file) {
      localBlobUrl = imgItem.preview || URL.createObjectURL(imgItem.file);
      setImageSrc(localBlobUrl);
    }
    // 🔹 EDIT MODE — existing server image via imageUrl field
    else if (isEditMode && imgItem?.imageUrl) {
      const fileName = imgItem.imageUrl.split("/").pop();

      if (!fileName) { setImageSrc(null); return; }

      if (fetchedRef.current[fileName]) {
        setImageSrc(fetchedRef.current[fileName]);
        return;
      }
      if (fetchingRef.current.has(fileName)) return;
      fetchingRef.current.add(fileName);

      dispatch(
        getThePDFPrevImage(fileName, (err, blob) => {
          fetchingRef.current.delete(fileName);
          if (!err && blob) {
            const url = URL.createObjectURL(blob);
            fetchedRef.current[fileName] = url;
            setImageSrc(url);
          } else {
            setImageSrc(null);
          }
        }),
      );
    } else {
      setImageSrc(null);
    }

    return () => {
      if (localBlobUrl && !imgItem?.preview) URL.revokeObjectURL(localBlobUrl);
    };
  }, [isScanPage, isEditMode, currentFormData?.profileImg, currentFormData?.imageUrl, dispatch]);

  // 🧹 Revoke all cached server blobs on unmount
  useEffect(() => {
    return () => {
      Object.values(fetchedRef.current).forEach((url) => {
        if (url?.startsWith("blob:")) URL.revokeObjectURL(url);
      });
    };
  }, []);

  // ─── Empty state check ────────────────────────────────────────────
  const isEmptyValue = (value) => {
    if (value === null || value === undefined) return true;
    if (typeof value === "string") return value.trim() === "";
    if (Array.isArray(value)) return value.length === 0 || value.every(isEmptyValue);
    if (typeof value === "object") {
      return Object.keys(value).length === 0 || Object.values(value).every(isEmptyValue);
    }
    return false;
  };

  const hasAnyValue = Object.values(currentFormData || {}).some(
    (value) => !isEmptyValue(value),
  );

  if (!hasAnyValue) return <EmptyPreview />;

  const {
    allergies = [],
    certificates = [],
    organic = [],
    consumption = [],
    recycleStamps = [],
    title = "",
    description = "",
    header = "",
    categories = [],
    ingredients = [],
    nutritions = [],
    qualification,
  } = currentFormData || {};

  return (
    <div className="min-h-full" style={{ backgroundColor: bgColor }}>

      {/* Product Image */}
      {imageSrc && (
        <div>
          <img
            src={imageSrc}
            alt="Product"
            className="w-full object-cover rounded"
          />
        </div>
      )}

      <div
        className="-mt-3 rounded-tl-3xl rounded-tr-3xl relative z-10"
        style={{ backgroundColor: bgColor }}
      >
        <div className="w-[90%] mx-auto py-4 bg-transparent">
          <h2 className="text-lg font-bold text-center">{title}</h2>
          <p className="text-sm text-center text-gray-600">{description}</p>
          <p className="text-sm font-semibold text-center">{header}</p>

          {/* Categories */}
          {categories.length > 0 && (
            <div className="mt-3 space-y-1 border p-2 rounded-md bg-white">
              {categories.map((item, index) => (
                <div key={index} className="flex text-xs">
                  <span className="font-bold">{item.category}: </span>
                  <span> {item.categoryValue}</span>
                </div>
              ))}
            </div>
          )}

          {/* Ingredients */}
          {ingredients.length > 0 && (
            <div className="mt-3 space-y-1 border p-2 rounded-md bg-white">
              <p className="text-sm font-semibold text-left">Ingredients</p>
              <ul className="list-disc list-inside text-xs text-left">
                {ingredients.map((item, index) => (
                  <li key={index}>{item.name}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Nutritional Information */}
          {nutritions.length > 0 && (
            <div className="mt-3 text-left space-y-1 border p-2 rounded-md bg-white">
              <p className="text-sm font-semibold">
                {qualification || "Nutritional Information"}
              </p>
              {nutritions.map((item, index) => (
                <div key={index} className="flex text-xs">
                  <span className="font-bold">{item.nutrition}: </span>
                  <span> {item.nutritionValue}</span>
                </div>
              ))}
            </div>
          )}

          {/* Allergens */}
          {allergies.length > 0 && (
            <div className="mt-3 text-left space-y-1 border p-2 rounded-md bg-white">
              <p className="text-sm font-semibold">Allergens</p>
              <div className="flex flex-wrap gap-2">
                {allergies.map((allergy) => {
                  const imgObj = allergyIcons.find((a) => a.name === allergy);
                  return (
                    <div key={allergy} className="flex flex-col items-center text-xs">
                      {imgObj && <img src={imgObj.src} alt={allergy} className="w-6 h-6" />}
                      <span>{allergy}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Certificates */}
          {certificates.length > 0 && (
            <div className="mt-3 text-left space-y-1 border p-2 rounded-md bg-white">
              <p className="text-sm font-semibold">Certificates</p>
              <div className="flex flex-wrap gap-2">
                {certificates.map((cert) => {
                  const imgObj = certificateIcons.find((c) => c.name === cert);
                  return (
                    <div key={cert} className="flex flex-col items-center text-xs">
                      {imgObj && <img src={imgObj.src} alt={cert} className="w-6 h-6" />}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Organic Certifications */}
          {organic.length > 0 && (
            <div className="mt-3 text-left space-y-1 border p-2 rounded-md bg-white">
              <p className="text-sm font-semibold">Organic Certifications</p>
              <div className="flex flex-wrap gap-2">
                {organic.map((org) => {
                  const imgObj = organicIcons.find((o) => o.name === org);
                  return (
                    <div key={org} className="flex flex-col items-center text-xs">
                      {imgObj && <img src={imgObj.src} alt={org} className="w-6 h-6" />}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Responsible Consumption */}
          {consumption.length > 0 && (
            <div className="mt-3 text-left space-y-1 border p-2 rounded-md bg-white">
              <p className="text-sm font-semibold">Responsible Consumption</p>
              <div className="flex flex-wrap gap-2">
                {consumption.map((cons) => {
                  const imgObj = consumptionIcons.find((c) => c.name === cons);
                  return (
                    <div key={cons} className="flex flex-col items-center text-xs">
                      {imgObj && <img src={imgObj.src} alt={cons} className="w-6 h-6" />}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Recycle Stamps */}
          {recycleStamps.length > 0 && (
            <div className="mt-3 text-left space-y-1 border p-2 rounded-md bg-white">
              <p className="text-sm font-semibold">Recycle Stamps</p>
              <div className="flex flex-wrap gap-2">
                {recycleStamps.map((stamp) => {
                  const imgObj = recycleIcons.find((r) => r.name === stamp);
                  return (
                    <div key={stamp} className="flex flex-col items-center text-xs">
                      {imgObj && <img src={imgObj.src} alt={stamp} className="h-6" />}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default PreviewScreen;