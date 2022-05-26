import React, { useRef } from "react";

/**
 * this is used to preserve the ref of the child element in given at and promise that the wrapper
 * component is has a valid ref to the child element
 *
 * this is used on wrapper component with single child
 * this hook checks if the child element is passing ref element and
 * if it is, it sets the ref to the given ref,else it creates a new ref and return it
 *
 * @param children - child of the component
 */
const usePassRef = <T extends any = any>(children): React.RefObject<T> => {
  const nodeRef = useRef<T>(null);
  let passRef = nodeRef;
  if (children?.ref && "current" in children.ref) {
    // @ts-ignore
    nodeRef.current = children.ref.current;
    passRef = children.ref;
  }
  return passRef;
};
export default usePassRef;
