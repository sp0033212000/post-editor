import React, { PropsWithChildren } from "react";

const ConditionalFragment: React.FC<
  PropsWithChildren<{ condition?: boolean }>
> = ({ condition = true, children }) => {
  if (!condition) return null;
  return <React.Fragment>{children}</React.Fragment>;
};

export default ConditionalFragment;
