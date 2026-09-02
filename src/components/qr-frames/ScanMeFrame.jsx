import React, { useRef, useState, useEffect } from "react";
import { toPng } from "html-to-image";

const ScanMeFrame = ({ size = 150, qrcode }) => {
    const frameRef = useRef(null); // Reference to the frame
    const [imageSrc, setImageSrc] = useState(null); // State to hold the generated image

    // Automatically generate image when the component mounts
    useEffect(() => {
        const generateImage = async () => {
            if (frameRef.current) {
                try {
                    // Convert the content to a PNG image
                    const dataUrl = await toPng(frameRef.current, {
                        width: size + 20, // Adjust width
                        height: size + 60, // Adjust height
                    });
                    setImageSrc(dataUrl); // Update state with the generated image
                } catch (error) {
                    console.error("Error generating image:", error);
                }
            }
        };

        generateImage(); // Call the function to generate the image
    }, [size, qrcode]); // Dependencies to re-run the effect if size or qrcode changes

    return (
        <div className="flex flex-col items-center">
            {/* Frame to be captured */}
            <div className="hidden">
                <div
                    ref={frameRef} // Reference for html-to-image
                    className="flex flex-col justify-center gap-y-2 items-center"
                    style={{ width: size, height: size }}
                >
                    <div
                        className="flex justify-center items-center w-full h-full rounded-md bg-white"
                    >
                        <div className="flex justify-center items-center bg-slate-200 p-2 rounded-sm">
                            {qrcode}
                        </div>
                    </div>
                    <h3 className="text-center font-semibold text-slate-800 text-[13px]">
                        Scan me!
                    </h3>
                </div>
            </div>

            {/* Directly show the generated image */}
            {imageSrc && (
                <img
                    src={imageSrc}
                    alt="Generated QR Frame"
                    style={{ width: size + 20 }}
                />
            )}
        </div>
    );
};

export default ScanMeFrame;
