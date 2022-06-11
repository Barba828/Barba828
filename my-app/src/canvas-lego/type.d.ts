type RGBA = [number, number, number, number];
type MosaicType = "lego" | "spherical" | "flat";
type FillMosaicRectOptions = {
  shadow?: boolean;
  type?: MosaicType;
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
