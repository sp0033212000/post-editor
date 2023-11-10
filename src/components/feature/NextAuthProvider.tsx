"use client";
import React, { PropsWithChildren } from "react";

import { SessionProvider } from "next-auth/react";

const NextAuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default NextAuthProvider;
