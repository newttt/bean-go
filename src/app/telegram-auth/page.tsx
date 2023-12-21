"use client";
import Script from "next/script";
import React, { useEffect } from "react";

export default function TELEGRAM() {
  useEffect(() => {
    const handler = (event: any) => {
      console.log("TELEGRAM", event);
    };

    window.addEventListener("message", handler);
    return () => {
      window.removeEventListener("message", handler);
    };
  }, []);
  return (
    <div>
      <div className="tgme_widget_login medium nouserpic" id="widget_login">
        <button
          className="btn tgme_widget_login_button"
          onClick={() => {
            // "return twidgetlogin.auth();";
            if (typeof window === "undefined") return;
            const TWidgetLogin = (window as any).TWidgetLogin;
            TWidgetLogin.auth();
          }}>
          <i className="tgme_widget_login_button_icon"></i>log in with telegram
        </button>
      </div>

      <script src="//telegram.org/js/widget-frame.js?22"></script>
      <Script>{`(()=>{TWidgetLogin.init('widget_login', 6923708369, {"origin":"https:\/\/core.telegram.org"}, false, "en");})()`}</Script>
    </div>
  );
}
