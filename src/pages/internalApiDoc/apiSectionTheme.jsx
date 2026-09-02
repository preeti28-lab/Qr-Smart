import React from "react";
import {
  FiShield,
  FiKey,
  FiUser,
  FiFileText,
  FiLayers,
  FiLock,
  FiGrid,
} from "react-icons/fi";
import { MdQrCode2 } from "react-icons/md";
import { FaPuzzlePiece } from "react-icons/fa";
import { sections } from "./InternalApidocdata";

/**
 * Har sidebar section ka colour + icon (sirf presentation).
 */
export const sectionTheme = {
  Authentication: {
    text: "text-slate-600",
    soft: "bg-slate-50 text-slate-600",
    icon: FiShield,
    panelIcon: FiLock,
  },
  "API Keys": {
    text: "text-amber-500",
    soft: "bg-amber-50 text-amber-500",
    icon: FiKey,
    panelIcon: FiKey,
  },
  "QR Codes": {
    text: "text-blue-600",
    soft: "bg-blue-50 text-blue-600",
    icon: MdQrCode2,
    panelIcon: MdQrCode2,
  },
  "Bulk QR": {
    text: "text-emerald-600",
    soft: "bg-emerald-50 text-emerald-600",
    icon: FiLayers,
    panelIcon: FiLayers,
  },
  Users: {
    text: "text-emerald-600",
    soft: "bg-emerald-50 text-emerald-600",
    icon: FiUser,
    panelIcon: FiUser,
  },
  "Media / Files": {
    text: "text-rose-500",
    soft: "bg-rose-50 text-rose-500",
    icon: FiFileText,
    panelIcon: FiFileText,
  },
  Miscellaneous: {
    text: "text-violet-500",
    soft: "bg-violet-50 text-violet-500",
    icon: FaPuzzlePiece,
    panelIcon: FaPuzzlePiece,
  },
};

export const fallbackTheme = {
  text: "text-slate-500",
  soft: "bg-slate-50 text-slate-500",
  icon: FiGrid,
  panelIcon: FiGrid,
};

export const getSectionTheme = (label) => sectionTheme[label] || fallbackTheme;

/** activeId kis section me hai - uska theme */
export const getThemeByItemId = (itemId) => {
  const section = sections.find((s) => s.items.some((i) => i.id === itemId));
  return getSectionTheme(section?.label);
};
