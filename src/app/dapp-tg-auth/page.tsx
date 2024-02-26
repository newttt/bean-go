"use client";

import React from "react";
import { Button } from "antd";

export default function DappTG() {
  return (
    <div>
      <div>-----ƒ</div>
      <Button
        onClick={() => {
          window.open("https://bean-go-newttt.vercel.app/tg-auth");
        }}>
        go Telegram Auth
      </Button>

      <div>
        <Button
          onClick={() => {
            window.open("https://bean-go-newttt.vercel.app/tg-auth-copy");
          }}>
          go Telegram Auth copy
        </Button>

        <Button
          onClick={() => {
            window.open("https://bean-go-newttt.vercel.app/telegram");
          }}>
          go Telegram Auth tg-auto

        </Button>

        
      </div>
    </div>
  );
}
