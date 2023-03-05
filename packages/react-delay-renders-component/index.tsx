import React, { useEffect, useMemo, useRef, useState } from "react";
import { useTruetyHook } from "shared/hooks/useTruetyHook";

export interface DelayedComponentPropsAPI {
  // the number of idle renders (cached result is returned) before running the actual expensive render that sample the DOM.
  // can be used to sample the DOM after other components updated, that your component maybe depends on.
  delayRenders?: number;
}

export interface DelayedComponentProps extends DelayedComponentPropsAPI {
  children: (...any: any[]) => React.ReactNode;
}

/** will render {delay} dumy memorized renders before actually rendering the given for each render
 used to delay component that relay on DOM properties of other component

 this component will only delay renders coming from parent component, but not renders triggered from the delayed component
 */
const DelayedComponent: React.FC<DelayedComponentProps> = ({ delayRenders = 1, children }) => {
  // console.log("DelayedComponent");
  const count = useRef(0);

  const c = count.current;
  let deps = delayRenders < 1 ? undefined : [c === delayRenders - 1];

  const comp = useTruetyHook(
    useMemo,
    () => {
      return children();
    },
    deps
  );

  const [, setRender] = useState({});
  const reRender = () => setRender({});
  useEffect(() => {
    if (count.current != delayRenders) {
      reRender();
      count.current += 1;
    } else {
      count.current = 0;
    }
  });
  return comp;
};
export default DelayedComponent;
