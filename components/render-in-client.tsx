"use client";

import { useState, useEffect, Fragment, type ReactNode } from "react";

const RenderInClient = ({ children }: { children: ReactNode }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient ? children : <Fragment />;
};

export default RenderInClient;
