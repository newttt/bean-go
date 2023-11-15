"use client";

import React from "react";
import { Button } from "antd";
import "antd/dist/antd.min.css";
export default function LinkC() {
  return (
    <div>
      <a href="sign">
        <Button>Go to sign</Button>
      </a>
      <a href="assets">
        <Button>Go to assets</Button>
      </a>
      <a href="bingo">
        <Button>Go to bingo</Button>
      </a>
    </div>
  );
}
