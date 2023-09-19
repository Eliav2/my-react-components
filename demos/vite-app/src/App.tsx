import "./App.css";
import SvgResizer, { SvgGResizer } from "react-svg-resizer";

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
      <svg width="100" height="100">
        <circle cx="50" cy="50" r="40" fill="blue" />
      </svg>

      <h2>scale inner svg to 30</h2>
      <svg width="100" height="100">
        <SvgGResizer size={30} center={false}>
          <circle cx="50" cy="50" r="40" fill="blue" />
        </SvgGResizer>
      </svg>

      <h2>scale entire svg to 30</h2>
      <SvgResizer size={30}>
        <svg width="100" height="100">
          <circle cx="50" cy="50" r="40" fill="blue" />
        </svg>
      </SvgResizer>
    </>
  );
};

export default App;
