import React from "react";
import dynamic from "next/dynamic";

const NoSSRWrapper = (props: {
  children: Iterable<React.ReactNode> | React.ReactNode;
}) => <React.Fragment>{props.children}</React.Fragment>;

export default dynamic(() => Promise.resolve(NoSSRWrapper), {
  ssr: false,
});
