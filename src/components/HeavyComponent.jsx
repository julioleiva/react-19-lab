import React, { useEffect } from "react";

export const wait = (ms) => {
  const start = Date.now();
  let now = start;

  while (now - start < ms) now = Date.now();
};

export const HeavyComponent = ({children}) => {
  wait(300);
  useEffect(() => {
    console.log("re-render slow component");
  });

  return <div>{children}</div>
};