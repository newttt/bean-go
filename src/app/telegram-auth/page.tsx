"use client";
import Script from "next/script";
import React, { useEffect } from "react";
import { sleep } from "@portkey/utils";

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
          id="login-btn"
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
      <link rel="stylesheet" href="https://telegram.org/css/widget-frame.css?66" data-precedence="next" />
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
          // await sleep(1000);
          console.log(document.getElementById("login-btn"));
          document.getElementById("login-btn")?.click();
          console.log("TWidgetLogin====auth");
        }}></Script>

      {/* <script>{`function confirmRequest() {
  var confirm_url = '/auth/auth?bot_id=6923708369&origin=https%3A%2F%2Fcore.telegram.org&confirm=1&hash=4d8218db49bcb03056', el;
  if ((el = getEl('request_write')) && el.checked) {
    confirm_url += '&allow_write=1';
  }
  location.href = confirm_url;
}
function declineRequest() {
  window.close();
}
function logout() {
  location.href = '/auth/logout?bot_id=6923708369&origin=https%3A%2F%2Fcore.telegram.org&hash=b3ccb8a62ae53c554c';
  return false;
}
initRipple();`}</script> */}
      <button
        onClick={() => {
          const TWidgetLogin = (window as any)?.TWidgetLogin;
          if (!TWidgetLogin) return;
          TWidgetLogin.init(
            "widget_login",
            6923708369,
            { origin: "https://core.telegram.org" },
            false,
            "en"
          );
        }}>
        init
      </button>
    </div>
  );
}
