import React, { useRef } from "react";

/**
 * this is used to preserve the ref of the child element if given, and promise that the wrapper
 * component has a valid ref to the child element
 *
 * this is used on wrapper component with single child
 * this hook checks if the child element is passing ref element and
 * if it is, it sets the ref to the given ref,else it creates a new ref and return it
 *
 * @param children - child of the component
 */
const usePassChildrenRef = <T extends any = any>(children): React.RefObject<T> => {
  const nodeRef = useRef<T>(null);
  let passRef = nodeRef;
  // React.Children.only(children); // optionally, this will throw error if there are more than one child
  if (children?.ref && "current" in children.ref) {
    // @ts-ignore
    // if it has ref, set the ref to the given ref
    nodeRef.current = children.ref.current;
    passRef = children.ref;
  }
  return passRef;
};

/**
 * this is used to preserve the ref of an element if given, and if not given, it creates a new ref.
 */
export const usePassRef = <T extends any = any>(ref): React.RefObject<T> => {
  const nodeRef = useRef<T>(null);
  let passRef = nodeRef;
  // React.Children.only(children); // optionally, this will throw error if there are more than one child
  if (ref && "current" in ref) {
    // @ts-ignore
    // if it has ref, set the ref to the given ref
    nodeRef.current = ref.current;
    passRef = ref;
  }
  return passRef;
};

const usePassElem = <T extends any = any>(children): React.RefObject<T> => {
  const nodeRef = useRef<T>(null);
  let passRef = nodeRef;
  // React.Children.only(children);
  if (children?.ref && "current" in children.ref) {
    // @ts-ignore
    // if it has ref, set the ref to the given ref
    nodeRef.current = children.ref.current;
    passRef = children.ref;
  }
  return passRef;
};

export default usePassChildrenRef;
