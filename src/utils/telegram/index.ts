import { createScript } from "./createScript";
import { CreateScriptOptions } from "./types";

export const telegramAuthAccessToken = async (
  params: Omit<CreateScriptOptions, "onAuthCallback">
) => {
  if (typeof document === "undefined" || typeof window === "undefined") return;

  const scriptNode = createScript({ ...params });
  document.body.appendChild(scriptNode);
};
