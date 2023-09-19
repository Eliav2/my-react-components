import React, { useLayoutEffect, useState } from "react";
import isEqual from "react-fast-compare";
import { usePassRef } from "shared/hooks/usePassChildrenRef";

const bboxDefault = { x: 0, y: 0, width: 0, height: 0 };
export const getBBox = (ref: SVGGraphicsElement | null) => {
  if (!ref) return bboxDefault;
  return ref.getBBox();
};

export const useGetBBox = (ref: React.RefObject<SVGGraphicsElement>, deps: any[] = []) => {
  // console.log("useGetBBox");
  const [bbox, setBbox] = useState(bboxDefault);
  useLayoutEffect(() => {
    setBbox(getBBox(ref.current));
  }, [ref.current, ...deps]);
  useLayoutEffect(() => {
    const v = getBBox(ref.current);
    if (!isEqual(bbox, v)) setBbox(v);
  });
  return bbox;
};

export interface SvgGResizerProps {
  children: React.ReactElement;

  size: number;

  // center the svg around the origin (0,0)
  center?: boolean;
}

/**
 * takes svg react element as children and normalizes it to be centered and have a size of 1
 */
export const SvgGResizer = React.forwardRef<SVGGElement, SvgGResizerProps>(function NormalizedGSvg(
  { children, size, center = false },
  forwardedRef
) {
  const ref = usePassRef<SVGGElement>(forwardedRef);
  const bbox = useGetBBox(ref, [ref.current]);
  // console.log(bbox);
  let min = Math.min(bbox.height, bbox.width);
  let transform = ``;
  if (center) transform += `translate(${-bbox.x - bbox.width / 2}px,${-bbox.y - bbox.height / 2}px)`;
  transform += ` scale(${1 / min})`;
  if (size !== 1) {
    transform += ` scale(${size})`;
  }
  return (
    <g
      ref={ref}
      style={{
        transform,
        transformBox: "fill-box",
        transformOrigin: "center",
      }}
    >
      {children}
    </g>
  );
});

export interface SvgResizerProps {
  children: React.ReactElement;

  size: number;
}

const SvgResizer = React.forwardRef<SVGSVGElement, SvgResizerProps>(function NormalizedGSvg({ children, size }, forwardedRef) {
  const ref = usePassRef(forwardedRef);
  const bbox = useGetBBox(ref, [ref.current]);

  let min = Math.min(bbox.height, bbox.width);
  let transform = ``;
  transform += ` scale(${1 / min})`;
  if (size !== 1) {
    transform += ` scale(${size})`;
  }

  return (
    <svg
      ref={ref}
      viewBox={`${bbox.x} ${bbox.y} ${bbox.width} ${bbox.height}`}
      height={bbox.height}
      width={bbox.width}
      style={{
        transform,
        transformBox: "fill-box",
        transformOrigin: "center",
      }}
    >
      {children}
    </svg>
  );
});

export default SvgResizer;
