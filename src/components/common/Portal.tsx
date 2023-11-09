import React, { PropsWithChildren } from "react";
import { createPortal } from "react-dom";

import { isBrowser } from "@/src/utils";

const Portal: React.FC<PropsWithChildren> = ({ children }) => {
  if (!isBrowser()) return null;

  return createPortal(children, document.querySelector("body")!);
};

export default Portal;
