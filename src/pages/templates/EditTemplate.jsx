import React, { useState, useEffect } from "react";
import AppViewer from "../../layouts/AppViewer";
import QRViewer from "../../layouts/QRViewer";
import QRCorrectionLevel from "../../tools/qr-components/QRCorrectionLevel";
import QRAddLogo from "../../tools/qr-components/QRAddLogo";
import QRCodeStyle from "../../tools/qr-components/QRCodeStyle";
import QRFrame from "../../tools/qr-components/QRFrame";
import MyButton from "../../components/buttons/MyButton";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getTemplateById, updateTemplate } from "../../redux/features/templates";
import { FaArrowLeft } from "react-icons/fa";
import { Spinner } from "@material-tailwind/react";

const EditTemplate = () => {
    const dispatch  = useDispatch();
    const navigate  = useNavigate();
    const { id }    = useParams();
    const { currentTemplate, isTemplateLoading } = useSelector(s => s.template);

    // ── state — exact same variable names as QRDesign ──
    const [isLevel,                     setIsLevel]                     = useState("Q");
    const [isLogo,                      setIsLogo]                      = useState("");
    const [isFrame,                     setIsFrame]                     = useState("");
    const [isCodeStyle,                 setIsCodeStyle]                 = useState("rounded");
    const [isCorner,                    setIsCorner]                    = useState("extra-rounded");
    const [isCenterStyle,               setIsCenterStyle]               = useState("dot");
    const [isCodeStyleBorderColor,      setIsCodeStyleBorderColor]      = useState("#000000");
    const [isCodeStyleDotColor,         setIsCodeStyleDotColor]         = useState("#000000");
    const [isCodeStyleCenterColor,      setIsCodeStyleCenterColor]      = useState("#000000");
    const [isCodeStyleBackgroundColor,  setIsCodeStyleBackgroundColor]  = useState("#ffffff");
    const [isUploadedImage,             setIsUploadedImage]             = useState(false);
    const [templateName,                setTemplateName]                = useState("");
    const [nameError,                   setNameError]                   = useState("");
    const [hydrated,                    setHydrated]                    = useState(false);

    // ── Fetch on mount ──
    useEffect(() => {
        if (id) dispatch(getTemplateById(id));
    }, [id, dispatch]);

    // ── Hydrate all fields once data arrives ──
    useEffect(() => {
        if (!currentTemplate || hydrated) return;
        const s = currentTemplate.style || {};
        setTemplateName(currentTemplate.name || "");
        setIsFrame(s.selectedFrame || "");
        setIsCodeStyle(s.isCodeStyle || "rounded");
        setIsCorner(s.isCorner || "extra-rounded");
        setIsCenterStyle(s.isCenterStyle || "dot");
        setIsCodeStyleBorderColor(s.isCodeStyleBorderColor || "#000000");
        setIsCodeStyleDotColor(s.isCodeStyleDotColor || "#000000");
        setIsCodeStyleCenterColor(s.isCodeStyleCenterColor || "#000000");
        setIsCodeStyleBackgroundColor(s.isCodeStyleBackgroundColor || "#ffffff");
        setIsLogo(s.selectedLogo || "");
        setIsLevel(s.selectedLevel || "Q");
        setHydrated(true);
    }, [currentTemplate, hydrated]);

    const handleUpdate = () => {
        if (!templateName.trim()) {
            setNameError("Template name is required");
            return;
        }
        setNameError("");

        const style = {
            selectedFrame:               isFrame,
            selectedShape:               "square",
            isCodeStyle,
            isCorner,
            isCenterStyle,
            isCodeStyleBorderColor,
            isCodeStyleDotColor,
            isCodeStyleCenterColor,
            isCodeStyleBackgroundColor,
            selectedLogo:                isLogo || null,
            selectedLevel:               isLevel,
            image:                       isLogo || "",
            logoPreset:                  "logo4",
            corners: {
                dotColor:    isCodeStyleCenterColor,
                dotStyle:    isCenterStyle,
                squareColor: isCodeStyleDotColor,
                squareStyle: isCorner,
            },
            frame: {
                id:              isFrame || null,
                text:            "Scan me!",
                textColor:       "#000000",
                fontSize:        100,
                color:           { type: "solid", rotation: 0, colorStops: [{ offset: 0, color: "#000000" }] },
                backgroundColor: { type: "solid", rotation: 0, colorStops: [{ offset: 0, color: "#ffffff" }] },
            },
            shape: {
                dotsStyle:       isCodeStyle,
                backgroundColor: isCodeStyleBackgroundColor,
                color:           { type: "solid", rotation: 0, colorStops: [{ offset: 0, color: isCodeStyleBorderColor }] },
            },
        };

        dispatch(updateTemplate(id, templateName.trim(), style));
        navigate("/templates");
    };

    // ── Loading skeleton while fetching ──
    if (isTemplateLoading && !hydrated) {
        return (
            <AppViewer>
                <div className="flex justify-center items-center py-32">
                    <Spinner className="w-8 h-8" />
                </div>
            </AppViewer>
        );
    }

    return (
        <AppViewer>
            <QRViewer
                current={2}
                selectedFrame={isFrame}
                selectedLogo={isLogo}
                selectedLevel={isLevel}
                selectedCodeStyle={isCodeStyle}
                selectedCorner={isCorner}
                selectedCenterStyle={isCenterStyle}
                selectedCodeStyleBorderColor={isCodeStyleBorderColor}
                selectedCodeStyleDotColor={isCodeStyleDotColor}
                selectedCodeStyleCenterColor={isCodeStyleCenterColor}
                selectedCodeStyleBackgroundColor={isCodeStyleBackgroundColor}
                frameTitle="Preview"
                hideProgress={true}
            >
                <div className="w-full flex flex-col justify-start items-start gap-y-5">

                    {/* ── Title ── */}
                    <h2 className="text-[20px] font-semibold">Edit Template</h2>

                    {/* ── Template Name input ── */}
                    <div className="w-full flex flex-col gap-y-1">
                        <label className="font-semibold text-gray-700 text-[14px]">
                            Template Name <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            value={templateName}
                            onChange={e => { setTemplateName(e.target.value); setNameError(""); }}
                            placeholder="E.g. Brand Blue Template"
                            className={`outline-none border-2 px-4 text-slate-800 placeholder:text-gray-400
                                hover:border-slate-700 focus:border-blue-700 transition-all duration-300
                                font-medium border-solid rounded-full py-1.5 w-full
                                ${nameError ? "border-red-400" : "border-gray-400"}`}
                        />
                        {nameError && <p className="text-red-500 text-[12px]">{nameError}</p>}
                    </div>

                    {/* ── Exact same design controls as QRDesign.jsx ── */}
                    <div className="flex flex-col w-full justify-start items-start gap-y-4">

                        <QRFrame
                            selected={isFrame}
                            setSelected={setIsFrame}
                        />

                        <QRCodeStyle
                            isCodeStyle={isCodeStyle}
                            setIsCodeStyle={setIsCodeStyle}
                            isCorner={isCorner}
                            setIsCorner={setIsCorner}
                            isCenterStyle={isCenterStyle}
                            setIsCenterStyle={setIsCenterStyle}
                            isCodeStyleBorderColor={isCodeStyleBorderColor}
                            setIsCodeStyleBorderColor={setIsCodeStyleBorderColor}
                            isCodeStyleDotColor={isCodeStyleDotColor}
                            setIsCodeStyleDotColor={setIsCodeStyleDotColor}
                            isCodeStyleCenterColor={isCodeStyleCenterColor}
                            setIsCodeStyleCenterColor={setIsCodeStyleCenterColor}
                            isCodeStyleBackgroundColor={isCodeStyleBackgroundColor}
                            setIsCodeStyleBackgroundColor={setIsCodeStyleBackgroundColor}
                        />

                        <QRCorrectionLevel
                            selectedLevel={isLevel}
                            setSelectedLevel={setIsLevel}
                        />

                        <QRAddLogo
                            logo={isLogo}
                            changeLogo={setIsLogo}
                            setIsUploadedImage={setIsUploadedImage}
                        />
                    </div>
                </div>

                {/* ── Bottom buttons — Back + Update (same as Back + Finish in Image 1) ── */}
                <div className="w-full flex justify-center gap-3 mt-4">
                    <MyButton
                        className="text-slate-700 border border-slate-700 flex justify-center items-center gap-x-2 py-2 rounded-full bg-white font-semibold"
                        onClick={() => navigate("/templates")}
                    >
                        <FaArrowLeft size={14} />
                        <span>Back</span>
                    </MyButton>

                    <MyButton
                        className="text-slate-50 border border-green-700 hover:bg-green-800 transition-all flex justify-center items-center gap-x-2 py-1.5 rounded-full text-[15px] bg-green-700 font-semibold"
                        onClick={handleUpdate}
                        disabled={isTemplateLoading}
                    >
                        {isTemplateLoading ? (
                            <span className="flex gap-2 items-center">
                                Saving <Spinner color="white" className="w-4 h-4" />
                            </span>
                        ) : (
                            <span>Update Template</span>
                        )}
                    </MyButton>
                </div>

            </QRViewer>
        </AppViewer>
    );
};

export default EditTemplate;