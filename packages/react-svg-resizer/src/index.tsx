import React, { useLayoutEffect, useState } from "react";
import isEqual from "react-fast-compare";
import { usePassRef } from "shared/hooks/usePassChildrenRef";
import type { Property } from "csstype";

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

  scaleByMax?: boolean;

  SvgProps?: React.SVGProps<SVGSVGElement>;
}

const SvgResizer = React.forwardRef<SVGSVGElement, SvgResizerProps>(function NormalizedGSvg(
  { children, size, scaleByMax = false, SvgProps = {} },
  forwardedRef
) {
  const ref = usePassRef(forwardedRef);
  const bbox = useGetBBox(ref, [ref.current]);

  let min = Math.min(bbox.height, bbox.width);
  let max = Math.max(bbox.height, bbox.width);
  let scaleFactor = size / (scaleByMax ? max : min);
  if (!isFinite(scaleFactor)) scaleFactor = 0;

  return (
    <svg
      ref={ref}
      // This is actually the equivalent of saying, make this svg parent show exactly the content of the children svg element
      viewBox={`${bbox.x} ${bbox.y} ${bbox.width} ${bbox.height}`}
      height={bbox.height * scaleFactor}
      width={bbox.width * scaleFactor}
      {...SvgProps}
    >
      {children}
    </svg>
  );
});

export default SvgResizer;
