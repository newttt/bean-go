"use client";
import { PortkeyProvider } from "@portkey/did-ui-react";
import React from "react";
import Test from "./test";

export default function Example() {
  return (
    <PortkeyProvider networkType="MAINNET">
      <Test />
    </PortkeyProvider>
  );
}
