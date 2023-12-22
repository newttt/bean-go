"use client";
import Script from "next/script";
import React, { useEffect } from "react";

enum TGStauts {
  unauthorized = "unauthorized",
}

export default function TELEGRAM() {
  useEffect(() => {
    const handler = async (event: any) => {
      console.log("TELEGRAM", event);
      const detail = JSON.parse(event.detail);
      console.log("TELEGRAM detail:", detail);
      // if (detail.event === "ready") {
      //   if (typeof window === "undefined") return;
      //   const TWidgetLogin = (window as any).TWidgetLogin;
      //   await sleep(1000);
      // }
      switch (detail.event) {
        case TGStauts.unauthorized:
          break;
      }
    };

    window.addEventListener("TG-SEND", handler);
    return () => {
      window.removeEventListener("TG-SEND", handler);
    };
  }, []);

  return (
    <div>
      <div className="tgme_widget_login medium nouserpic" id="widget_login">
        <button
          id="login-btn"
          className="btn tgme_widget_login_button"
          onClick={() => {
            if (typeof window === "undefined") return;
            const TWidgetLogin = (window as any).TWidgetLogin;
            TWidgetLogin.auth();
          }}>
          <i className="tgme_widget_login_button_icon"></i>log in with telegram
        </button>
      </div>
      <link
        rel="stylesheet"
        href="https://telegram.org/css/widget-frame.css?66"
        data-precedence="next"
      />
      <Script
        src="/widget-frame.js"
        onLoad={async () => {
          const TWidgetLogin = (window as any)?.TWidgetLogin;
          console.log(TWidgetLogin, "TWidgetLogin====");
          if (!TWidgetLogin) return;
          TWidgetLogin.init(
            "widget_login",
            6923708369,
            { origin: "https://core.telegram.org" },
            false,
            "en"
          );

          TWidgetLogin.auth();
        }}></Script>
    </div>
  );
}
