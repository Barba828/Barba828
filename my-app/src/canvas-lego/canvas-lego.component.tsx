import React, { ChangeEventHandler, FC, useEffect } from "react";
import { fillLegoRect, toMosaic } from "./utils";

import "./canvas-lego.component.css";

export const CanvasToLego: FC = () => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const [imgSrc, setImgSrc] = React.useState<string>("");
  const [size, setSize] = React.useState<number>(20);
  const [width, setWidth] = React.useState<number>(800);

  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }
    toMosaic(canvasRef.current, {
      imgSrc,
      fillMosaicRect: fillLegoRect,
      size,
    });
  }, [canvasRef, imgSrc, size, width]);

  const handleChangeFile: ChangeEventHandler<HTMLInputElement> = ({
    target: { files },
  }) => {
    if (!files || !files[0]) {
      return;
    }
    const localUrl = URL.createObjectURL(files[0]);
    setImgSrc(localUrl);
  };

  const handleChangeSize: ChangeEventHandler<HTMLInputElement> = ({
    target: { value },
  }) => {
    setSize(Number(value) || 20);
  };

  const handleChangeWidth: ChangeEventHandler<HTMLInputElement> = ({
    target: { value },
  }) => {
    setWidth(Number(value) || 800);
  };

  return (
    <div>
      <div className="lego-input">
        <input
          type="file"
          accept="image/gif,image/jpeg,image/jpg,image/png"
          onChange={handleChangeFile}
        />

        <input
          type="range"
          id="size"
          name="size"
          min={10}
          max={100}
          value={size}
          onChange={handleChangeSize}
        ></input>
        <input
          type="range"
          id="size"
          name="size"
          min={200}
          max={2000}
          value={width}
          onChange={handleChangeWidth}
        ></input>
      </div>
      <canvas ref={canvasRef} id="mosaic" width={width} height={width}></canvas>
      {imgSrc && <img src={imgSrc} alt="pic" width="400" />}
    </div>
  );
};
