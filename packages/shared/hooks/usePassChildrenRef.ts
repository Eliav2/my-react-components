import React, { useLayoutEffect, useRef } from "react";
import useRerender from "./useRerender";


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
const usePassChildrenRef = <T extends any = any>(children: React.ReactElement): React.RefObject<T> => {
  return usePassRef<T>((children as any).ref);
  // const nodeRef = useRef<T>(null);
  // let passRef = nodeRef;
  // // React.Children.only(children); // optionally, this will throw error if there are more than one child
  // if (children?.ref && "current" in children.ref) {
  //   // @ts-ignore
  //   // if it has ref, set the ref to the given ref
  //   nodeRef.current = children.ref.current;
  //   passRef = children.ref;
  // }
  // return passRef;
};

const isRef = <T>(ref: React.Ref<T>): ref is React.RefObject<T> => {
  return !!ref && "current" in ref;
};

/**
 * this is used to preserve the ref of an element if given, and if not given, it creates a new ref.
 * this is useful on component that should pass refs, and also uses the ref internally
 * (if the internal component would count on the parent component to pass ref it might be ended with null)
 */
export const usePassRef = <T extends any = any>(ref: React.ForwardedRef<T>) => {
  const nodeRef = useRef<T>(null);
  let passRef = nodeRef;
  // React.Children.only(children); // optionally, this will throw error if there are more than one child
  if (isRef(ref)) {
    // @ts-ignore
    // if it has ref, set the ref to the given ref
    nodeRef.current = ref.current;
    passRef = ref;
  }
  return passRef;
};

const usePassElem = <T extends any = any>(children: React.ReactElement): React.RefObject<T> => {
  const nodeRef = useRef<T>(null);
  let passRef = nodeRef;
  // React.Children.only(children);
  const _children = children as any;
  if (isRef(_children.ref)) {
    // @ts-ignore
    // if it has ref, set the ref to the given ref
    nodeRef.current = _children.ref.current;
    passRef = _children.ref;
  }
  return passRef;
};

export default usePassChildrenRef;
