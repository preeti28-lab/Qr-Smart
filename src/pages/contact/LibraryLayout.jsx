import React, { useEffect, useRef, useState } from "react";
import chairImgSrc from "../../assets/chair.png";

const LibraryLayout = () => {
  const canvasRef = useRef(null);
  const [canvasSize, setCanvasSize] = useState({ width: 1000, height: 500 });

  useEffect(() => {
    const updateCanvasSize = () => {
      const newWidth = window.innerWidth * 0.9; // 90% of screen width
      const newHeight = newWidth / 2; // Maintain aspect ratio
      setCanvasSize({ width: newWidth, height: newHeight });
    };

    updateCanvasSize();
    window.addEventListener("resize", updateCanvasSize);

    return () => window.removeEventListener("resize", updateCanvasSize);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    // Set canvas size dynamically
    canvas.width = canvasSize.width;
    canvas.height = canvasSize.height;

    // Clear canvas before redrawing
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Scale factor based on default 1000x500 layout
    const scaleX = canvas.width / 1000;
    const scaleY = canvas.height / 500;

    // Load the chair image
    const chairImg = new Image();
    chairImg.src = chairImgSrc;

    chairImg.onload = () => {
      const drawRotatedImage = (image, x, y, width, height, angle) => {
        ctx.save();
        ctx.translate(x + width / 2, y + height / 2);
        ctx.rotate((angle * Math.PI) / 180);
        ctx.drawImage(image, -width / 2, -height / 2, width, height);
        ctx.restore();
      };

      const drawChair = (x, y, label, angle = 0) => {
        const width = 40 * scaleX;
        const height = 40 * scaleY;

        drawRotatedImage(
          chairImg,
          x * scaleX,
          y * scaleY,
          width,
          height,
          angle
        );

        // Draw label
        ctx.fillStyle = "red";
        ctx.font = `${16 * scaleX}px Arial`;
        ctx.fillText(label, x * scaleX + 15, y * scaleY + 35);
      };

      const drawDesk = (x, y, angle = 0) => {
        const width = 50 * scaleX;
        const height = 30 * scaleY;

        ctx.save();
        ctx.translate(x * scaleX + width / 2, y * scaleY + height / 2);
        ctx.rotate((angle * Math.PI) / 180);
        ctx.fillStyle = "#8B4513";
        ctx.fillRect(-width / 2, -height / 2, width, height);
        ctx.restore();
      };

      // Chair positions with angles
      const chairPositions = [
        { x: 50, y: 50, angle: 0 },
        { x: 100, y: 50, angle: 90 },
        { x: 150, y: 50, angle: 180 },
        { x: 200, y: 50, angle: -90 },
        { x: 50, y: 100, angle: 0 },
        { x: 100, y: 100, angle: 45 },
        { x: 150, y: 100, angle: -45 },
        { x: 200, y: 100, angle: 0 },
        { x: 300, y: 50, angle: 90 },
        { x: 350, y: 50, angle: -90 },
        { x: 400, y: 50, angle: 180 },
        { x: 450, y: 50, angle: 0 },
        { x: 300, y: 100, angle: -45 },
        { x: 350, y: 100, angle: 45 },
        { x: 400, y: 100, angle: 0 },
        { x: 450, y: 100, angle: 180 },
        { x: 600, y: 50, angle: 0 },
        { x: 650, y: 50, angle: 90 },
        { x: 700, y: 50, angle: -90 },
        { x: 750, y: 50, angle: 0 },
        { x: 600, y: 100, angle: 180 },
        { x: 650, y: 100, angle: 45 },
        { x: 700, y: 100, angle: -45 },
        { x: 750, y: 100, angle: 0 },
      ];

      // Desk positions with angles
      const deskPositions = [
        { x: 75, y: 70, angle: 0 },
        { x: 175, y: 70, angle: 90 },
        { x: 325, y: 70, angle: -90 },
        { x: 425, y: 70, angle: 180 },
        { x: 625, y: 70, angle: 45 },
        { x: 725, y: 70, angle: -45 },
      ];

      // Draw desks with rotation
      deskPositions.forEach((pos) => drawDesk(pos.x, pos.y, pos.angle));

      // Draw chairs with rotation
      chairPositions.forEach((pos, index) =>
        drawChair(pos.x, pos.y, index + 1, pos.angle)
      );
    };
  }, [canvasSize]);

  return (
    <div style={{ textAlign: "center", margin: "20px" }}>
      <h2>Library Layout</h2>
      <canvas
        ref={canvasRef}
        style={{ border: "1px solid black", width: "100%", maxWidth: "1000px" }}
      />
    </div>
  );
};

export default LibraryLayout;
