import "./App.css";
import SvgResizer from "react-svg-resizer";
import JIcon from "./JIcon.tsx";
import WideIcon from "./WideIcon.tsx";
import { useState } from "react";
import AddHomeWorkIcon from "@mui/icons-material/AddHomeWork";

function App() {
  return (
    <>
      <h1>SvgResizer</h1>
      <SvgResizerDemo />{" "}
    </>
  );
}

const ResizeableSvg = ({ children, title }: { children: React.ReactElement; title: string }) => {
  const [scaleByMax, setScaleByMax] = useState(false);
  const [size, setSize] = useState(50);

  return (
    <div style={{ border: "1px solid black" }}>
      <h2>{title}</h2>
      <h3>unmodified:</h3>
      {children}
      <h3>modified:</h3>
      <div>
        size: {size}
        <input type={"range"} max={500} value={size} onChange={(e) => setSize(Number(e.target.value))} />
        scaleByMax:
        <input type={"checkbox"} checked={scaleByMax} onChange={(e) => setScaleByMax(e.target.checked)} />
        <div style={{ padding: 8 }}>
          <SvgResizer size={size} scaleByMax={scaleByMax}>
            {children}
          </SvgResizer>
        </div>
      </div>
    </div>
  );
};

const SvgResizerDemo = () => {
  return (
    <>
      <ResizeableSvg title={"MUI Icons"}>
        <AddHomeWorkIcon />
      </ResizeableSvg>

      <ResizeableSvg title={"Custom Tall icon"}>
        <JIcon />
      </ResizeableSvg>

      <ResizeableSvg title={"Custom Wide icon"}>
        <WideIcon />
      </ResizeableSvg>

      <ResizeableSvg title={"Simple Rect React Element"}>
        <svg width="60" height="30">
          <rect width="60" height="30" fill="blue" />
        </svg>
      </ResizeableSvg>
    </>
  );
};

export default App;
