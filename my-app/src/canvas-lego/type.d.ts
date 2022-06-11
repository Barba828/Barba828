type RGBA = [number, number, number, number];

type FillMosaicRectOptions = {
  shadow?: boolean;
  button?: "lego" | "spherical" | "flat";
};

interface FillMosaicRect {
  (
    ctx: CanvasRenderingContext2D,
    rgba: RGBA,
    x: number,
    y: number,
    w: number,
    h: number,
    options?: FillMosaicRectOptions
  ): void;
}
