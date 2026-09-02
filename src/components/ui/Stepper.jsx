// PATH: src/components/ui/Stepper.jsx
import React from "react";
import { IoQrCode } from "react-icons/io5";
import { MdContentPasteSearch } from "react-icons/md";
import { LuQrCode } from "react-icons/lu";
import StepRail from "./StepRail";

const steps = [
  { label: "Type of QR code", short: "Type", icon: <IoQrCode /> },
  { label: "Content", short: "Content", icon: <MdContentPasteSearch /> },
  { label: "QR design", short: "Design", icon: <LuQrCode /> },
];

/**
 * Thin wrapper so none of the 22 builder pages need to change: they still pass
 * a 1-indexed `currentStep`, StepRail works 0-indexed.
 *
 * The side padding lives here because those pages wrap this in a bare
 * `<div className="pt-3">` that has no horizontal padding of its own — without
 * it the rail runs edge to edge. QRViewer / QRBulkViewer use StepRail directly,
 * so they never get this padding twice.
 */
const Stepper = ({ currentStep = 1 }) => (
  <div className="px-4 sm:px-6">
    <StepRail steps={steps} current={currentStep - 1} />
  </div>
);

export default Stepper;