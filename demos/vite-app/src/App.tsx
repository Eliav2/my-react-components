import "./App.css";
import SvgResizer, { SvgGResizer } from "react-svg-resizer";
import JIcon from "./JIcon.tsx";
import WideIcon from "./WideIcon.tsx";
import { useState } from "react";

function App() {
  return (
    <>
      <h1>SvgResizer</h1>
      <SvgResizerDemo />{" "}
    </>
  );
}

const ResizeableSvg = ({ children, title }: { children: React.ReactNode; title: string }) => {
  const [size, setSize] = useState(50);
  return (
    <div style={{ border: "1px solid black" }}>
      <h2>{title}</h2>
      <h3>unmodofied:</h3>
      {children}
      <h3>modified:</h3>
      <div>
        size:
        <input title={"123"} type={"number"} value={size} onChange={(e) => setSize(e.target.value)} />
        <div style={{ padding: 8 }}>
          <SvgResizer size={size}>{children}</SvgResizer>
        </div>
      </div>
    </div>
  );
};

const SvgResizerDemo = () => {
  return (
    <>
      {/*<h2>scale inner svg to 30</h2>*/}
      {/*<svg width="100" height="100">*/}
      {/*  <SvgGResizer size={30} center={false}>*/}
      {/*    <circle cx="50" cy="50" r="40" fill="blue" />*/}
      {/*  </SvgGResizer>*/}
      {/*</svg>*/}
      {/*80->160  160=>300 (240)*/}
      {/*80->200  200=>500*/}

      <ResizeableSvg title={"Tall icon"}>
        <JIcon />
      </ResizeableSvg>

      <ResizeableSvg title={"Wide icon"}>
        <WideIcon />
      </ResizeableSvg>

      <ResizeableSvg title={"Simple Rect"}>
        <svg width="60" height="30">
          <rect width="60" height="30" fill="blue" />
        </svg>
      </ResizeableSvg>

      {/*<h2>scale entire svg to 30</h2>*/}
      {/*<SvgResizer size={80}>*/}
      {/*  <JIcon />*/}
      {/*</SvgResizer>*/}

      {/*<h1>wide icon</h1>*/}
      {/*<SvgResizer size={100}>*/}
      {/*  <WideIcon />*/}
      {/*</SvgResizer>*/}
      {/*<WideIcon />*/}

      {/*<h2>scale horizontal entire svg to 30</h2>*/}
      {/*<div style={{ display: "flex" }}>*/}
      {/*  <div>hey</div>*/}

      {/*  <SvgResizer size={100} transformOrigin={"left top"}>*/}
      {/*    <svg width="60" height="30">*/}
      {/*      <rect width="60" height="30" fill="blue" />*/}
      {/*    </svg>*/}
      {/*  </SvgResizer>*/}
      {/*</div>*/}
    </>
  );
};

export default App;
