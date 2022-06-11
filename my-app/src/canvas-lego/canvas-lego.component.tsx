import React, { FC, useEffect } from "react";
import { fillLegoRectFactory, toMosaic, mosaicType } from "./utils";

import "./canvas-lego.component.css";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Slider,
} from "@mui/material";

export const CanvasToLego: FC = () => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const fillLegoRectRef = React.useRef<FillMosaicRect>(fillLegoRectFactory());

  const [imgSrc, setImgSrc] = React.useState<string>("");
  const [size, setSize] = React.useState<number>(20);
  const [width, setWidth] = React.useState<number>(800);

  const [type, setType] = React.useState<MosaicType>("lego");
  const [shadow, setShadow] = React.useState<boolean>(true);

  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }
    toMosaic(canvasRef.current, {
      imgSrc,
      fillMosaicRect: fillLegoRectRef.current,
      size,
    });
  }, [canvasRef, imgSrc, size, width]);

  const handleSelectFile = async () => {
    const arrFileHandle = await (window as any).showOpenFilePicker({
      types: [
        {
          description: "Images",
          accept: {
            "image/*": [".png", ".gif", ".jpeg", ".jpg", ".webp"],
          },
        },
      ],
      // 可以选择多个图片
      multiple: true,
    });

    const file = await arrFileHandle[0].getFile();
    const buffer = await file.arrayBuffer();
    const localUrl = URL.createObjectURL(new Blob([buffer])); // 转成 Blod url地址
    setImgSrc(localUrl);
  };

  const handleChangeSize = (_e: Event, value: number | number[]) => {
    setSize(value as number);
  };

  const handleChangeWidth = (_e: Event, value: number | number[]) => {
    setWidth(value as number);
  };

  const handleChangeType = ({ target: { value } }: any) => {
    setType(value as MosaicType);
  };

  return (
    <div>
      <div className="lego-input">
        <Button onClick={handleSelectFile}>选择文件</Button>

        <Slider
          min={20}
          max={100}
          defaultValue={40}
          aria-label="Default"
          valueLabelDisplay="auto"
          onChange={handleChangeSize}
        />
        <Slider
          min={200}
          max={2000}
          defaultValue={400}
          aria-label="Default"
          valueLabelDisplay="auto"
          onChange={handleChangeWidth}
        />

        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">颗粒风格</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={type}
            label="颗粒风格"
            onChange={handleChangeType}
          >
            <MenuItem value={"lego"}>乐高</MenuItem>
            <MenuItem value={"spherical"}>球型</MenuItem>
            <MenuItem value={"flat"}>扁平</MenuItem>
          </Select>
        </FormControl>
      </div>
      <canvas ref={canvasRef} id="mosaic" width={width} height={width}></canvas>
      {imgSrc && <img src={imgSrc} alt="pic" width="400" />}
    </div>
  );
};
