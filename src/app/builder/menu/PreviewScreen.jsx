import React, { useEffect, useRef, useState } from "react";
import EmptyPreview from "../../../components/ui/EmptyPreview";
import { FaStar, FaRegStar } from "react-icons/fa";
import { FiMessageCircle } from "react-icons/fi";
import { getContrastColor } from "../../../utils";

import { allergyImages as allergyIcons } from "./constant";
import SectionPanel from "./SectionPanel";
import AllAllergens from "./AllAllergens";
import Opening from "./Opening";
import Location from "../business/previews/Location";
import { useDispatch } from "react-redux";
import { getThePDFPrevImage } from "../../../redux/features/qrcodes";

const PreviewScreen = ({ currentFormData, isScanPage, isEditMode }) => {
  const dispatch = useDispatch();
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const sectionRefs = useRef([]);
  const [coverSrc, setCoverSrc] = useState(null);
  const [logoSrc, setLogoSrc] = useState(null);

  // Cache fetched server images so we don't refetch on every render
  const fetchedCoverRef = useRef({}); // { [fileName]: blobUrl }
  const fetchedLogoRef = useRef({});
  const fetchingCoverRef = useRef(new Set());
  const fetchingLogoRef = useRef(new Set());

  const {
    title,
    assessment,
    assessmentType,
    website,
    coverLogo,
    companyLogo,

    description,
    menuTitle,
    nameOfEstablishment,
    sections,
    bannerColor,
    mode,
  } = currentFormData || {};
  const bgColor = bannerColor?.[0] || "#f3f4f6";
  const secondColor = bannerColor?.[1] || "#000";

  useEffect(() => {
    let coverObjectUrl;
    let logoObjectUrl;

    // ─────────────────────────────────────────────────────────────
    // 🔹 SCAN MODE — fetch API images from the scan payload
    // ─────────────────────────────────────────────────────────────
    if (isScanPage) {
      const bannerName = currentFormData?.bannerUrl?.split("/").pop();
      const logoName = currentFormData?.companyLogoUrl?.split("/").pop();

      if (bannerName) {
        dispatch(
          getThePDFPrevImage(bannerName, (err, blob) => {
            if (!err && blob) {
              coverObjectUrl = URL.createObjectURL(blob);
              setCoverSrc(coverObjectUrl);
            } else {
              setCoverSrc("");
            }
          }),
        );
      }

      if (logoName) {
        dispatch(
          getThePDFPrevImage(logoName, (err, blob) => {
            if (!err && blob) {
              logoObjectUrl = URL.createObjectURL(blob);
              setLogoSrc(logoObjectUrl);
            } else {
              setLogoSrc("");
            }
          }),
        );
      }

      return () => {
        if (coverObjectUrl) URL.revokeObjectURL(coverObjectUrl);
        if (logoObjectUrl) URL.revokeObjectURL(logoObjectUrl);
      };
    }

    // ─────────────────────────────────────────────────────────────
    // 🔹 COVER / BANNER
    // ─────────────────────────────────────────────────────────────
    const coverItem = coverLogo?.[0];

    // Priority 1: newly uploaded file (works in both create & edit mode)
    if (coverItem?.file) {
      const localUrl = coverItem.preview || URL.createObjectURL(coverItem.file);
      if (!coverItem.preview) coverObjectUrl = localUrl;
      setCoverSrc(localUrl);
    }
    // Priority 2: edit mode with existing server image
    else if (isEditMode && coverItem?.isExisting) {
      const serverPath = coverItem.serverUrl || coverItem.url;
      const fileName = serverPath?.split("/").pop();

      if (fileName) {
        // Use cached blob URL if we already fetched it
        if (fetchedCoverRef.current[fileName]) {
          setCoverSrc(fetchedCoverRef.current[fileName]);
        } else if (!fetchingCoverRef.current.has(fileName)) {
          fetchingCoverRef.current.add(fileName);
          dispatch(
            getThePDFPrevImage(fileName, (err, blob) => {
              fetchingCoverRef.current.delete(fileName);
              if (!err && blob) {
                const blobUrl = URL.createObjectURL(blob);
                fetchedCoverRef.current[fileName] = blobUrl;
                setCoverSrc(blobUrl);
              } else {
                setCoverSrc("https://img.qrfy.com/img/original/mockup_menu_v2.webp");
              }
            }),
          );
        }
      }
    }
    // Priority 3: fallback placeholder
    else {
      setCoverSrc("https://img.qrfy.com/img/original/mockup_menu_v2.webp");
    }

    // ─────────────────────────────────────────────────────────────
    // 🔹 COMPANY LOGO
    // ─────────────────────────────────────────────────────────────
    const logoItem = companyLogo?.[0];

    if (logoItem?.file) {
      const localUrl = logoItem.preview || URL.createObjectURL(logoItem.file);
      if (!logoItem.preview) logoObjectUrl = localUrl;
      setLogoSrc(localUrl);
    } else if (isEditMode && logoItem?.isExisting) {
      const serverPath = logoItem.serverUrl || logoItem.url;
      const fileName = serverPath?.split("/").pop();

      if (fileName) {
        if (fetchedLogoRef.current[fileName]) {
          setLogoSrc(fetchedLogoRef.current[fileName]);
        } else if (!fetchingLogoRef.current.has(fileName)) {
          fetchingLogoRef.current.add(fileName);
          dispatch(
            getThePDFPrevImage(fileName, (err, blob) => {
              fetchingLogoRef.current.delete(fileName);
              if (!err && blob) {
                const blobUrl = URL.createObjectURL(blob);
                fetchedLogoRef.current[fileName] = blobUrl;
                setLogoSrc(blobUrl);
              } else {
                setLogoSrc(null);
              }
            }),
          );
        }
      }
    } else {
      setLogoSrc(null);
    }

    // 🔹 CLEANUP (only for locally created blob URLs of *new* uploads)
    return () => {
      if (coverObjectUrl) URL.revokeObjectURL(coverObjectUrl);
      if (logoObjectUrl) URL.revokeObjectURL(logoObjectUrl);
    };
  }, [isScanPage, isEditMode, coverLogo, companyLogo, currentFormData, dispatch]);

  // 🧹 Cleanup all cached server-fetched blob URLs on unmount
  useEffect(() => {
    return () => {
      Object.values(fetchedCoverRef.current).forEach((url) => {
        if (url?.startsWith("blob:")) URL.revokeObjectURL(url);
      });
      Object.values(fetchedLogoRef.current).forEach((url) => {
        if (url?.startsWith("blob:")) URL.revokeObjectURL(url);
      });
    };
  }, []);

  const textColor = "#000";

  if (!currentFormData || Object.keys(currentFormData).length === 0) {
    return <EmptyPreview />;
  }

  const allAllergens = Array.from(
    new Set(
      sections?.flatMap((section) =>
        section.products?.flatMap((product) => product.allergies || []),
      ),
    ),
  );

  const allergenWithIcons = allAllergens
    .map((allergen) => allergyIcons.find((item) => item.name === allergen))
    .filter(Boolean);

  return (
    <div
      className={`min-h-full relative overflow-hidden ${
        isScanPage && "!min-h-[100dvh]"
      }`}
      style={{ backgroundColor: isScanPage ? bgColor : "" }}
    >
      <div className="relative">
        {logoSrc && (
          <img src={logoSrc} className="absolute w-10 h-10 left-3 top-3 object-cover" />
        )}
        <img src={coverSrc} className="w-full h-[200px] object-cover" />
      </div>
      <div
        className={`bg-white h-full py-3 rounded-tl-3xl rounded-tr-3xl -mt-5 relative  `}
        style={{ backgroundColor: bgColor }}
      >
        <p className="text-center font-semibold text-lg">
          {nameOfEstablishment}
        </p>
        <p className="text-center">{description}</p>
        <div
          className={`bg-white rounded-tl-3xl rounded-tr-3xl p-3 mt-4 ${isScanPage && "pt-8"}`}
        >
          <p className="text-sm font-semibold text-left">{menuTitle}</p>
          {sections?.length > 0 && (
            <>
              <div className="mt-3">
                {sections?.map((section, index) => {
                  return (
                    <div
                      key={index}
                      className="border rounded-md mb-2 cursor-pointer"
                      onClick={() => {
                        setActiveSectionIndex(index);
                        setIsPanelOpen(true);
                      }}
                    >
                      <p className="text-sm font-semibold  text-left p-2">
                        {section.sectionName}
                      </p>
                    </div>
                  );
                })}
              </div>
              <AllAllergens sections={sections} />
            </>
          )}
          <div className="border mt-3">
            <p className="pl-2 -mb-2 pt-1 text-sm font-semibold text-left">
              Find us{" "}
            </p>
            <Location
              currentFormData={currentFormData}
              bgColor={bgColor}
              iconColor={secondColor}
              iconBgColor={"#f0f0f0"}
            />
          </div>
        </div>

        <div className={`-mt-2 ${isScanPage && "!pb-5 bg-white"} `}>
          <Opening
            currentFormData={currentFormData}
            bgColor={bgColor}
            iconColor={secondColor}
            iconBgColor={"#f0f0f0"}
            outer={true}
          />
        </div>
      </div>
      <SectionPanel
        isOpen={isPanelOpen}
        currentFormData={currentFormData}
        onClose={() => setIsPanelOpen(false)}
        sections={sections || []}
        activeIndex={activeSectionIndex}
        setActiveIndex={setActiveSectionIndex}
        sectionRefs={sectionRefs}
        bgColor={bgColor}
        secondColor={secondColor}
        isScanPage={isScanPage}
      />
    </div>
  );
};

export default PreviewScreen;