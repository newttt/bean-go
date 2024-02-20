"use client";
import { sleep } from "@portkey/utils";
import React, { useCallback, useEffect, useState } from "react";

export default function Test() {
  const [error, setError] = useState<string>();
  // const replaceHref = useCallback(async () => {
  //   let hash = location.hash.replace("#", "?");
  //   if (!hash) {
  //     await sleep(1000);
  //     hash = location.hash.replace("#", "?");
  //   }
  //   if (!hash)
  //     return setError("Invalid, please close the webpage and try again");
  //   const href = `${process.env.NEXT_PUBLIC_APP_TELEGRAM_REDIRECT_URI}${hash}`;
  //   window.location.href = href;
  // }, []);

  // useEffect(() => {
  //   replaceHref();
  // }, [replaceHref]);

  useEffect(() => {
    window.addEventListener("beforeunload", () => {
      return "aaa";
    });
  }, []);

  return (
    <div className="h-screen flex justify-center items-center">
      {error ? error : "Loading"}
    </div>
  );
}
