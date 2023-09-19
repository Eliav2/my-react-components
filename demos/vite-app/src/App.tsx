import "./App.css";
import SvgResizer, { SvgGResizer } from "react-svg-resizer";
import JIcon from "./JIcon.tsx";
import WideIcon from "./WideIcon.tsx";

function App() {
  return (
    <>
      <h1>SvgResizer</h1>
      <SvgResizerDemo />{" "}
    </>
  );
}

const SvgResizerDemo = () => {
  return (
    <>
      <h2>unmodified svg</h2>
      <JIcon />

      {/*<h2>scale inner svg to 30</h2>*/}
      {/*<svg width="100" height="100">*/}
      {/*  <SvgGResizer size={30} center={false}>*/}
      {/*    <circle cx="50" cy="50" r="40" fill="blue" />*/}
      {/*  </SvgGResizer>*/}
      {/*</svg>*/}
      {/*80->160  160=>300 (240)*/}
      {/*80->200  200=>500*/}

      <h2>scale entire svg to 30</h2>
      <SvgResizer size={80}>
        <JIcon />
      </SvgResizer>

      <h1>wide icon</h1>
      <SvgResizer size={100}>
        <WideIcon />
      </SvgResizer>
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
