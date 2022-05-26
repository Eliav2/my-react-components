import {useState} from "react";

const useRerender = () => {
    const [, reRender] = useState({});
    return () => reRender({});
};
export default useRerender;
