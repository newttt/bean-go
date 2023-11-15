"use client";
import React, { useCallback } from "react";

export default function Password() {
  const onSubmit = useCallback(async (e: any) => {
    e.preventDefault();
    var formData = new FormData(e.target as any);
    const _window: any = window;
    if (typeof _window?.PasswordCredential === "undefined") {
      console.error("No PasswordCredential");
      return;
    }
    const cred = new _window.PasswordCredential({
      id: formData.get("id"),
      password: formData.get("password"),
    });
    console.log(cred, "cred==");
    const res = await navigator.credentials.store(cred);
    console.log(res, "res===");
    try {
    } catch (error) {}
  }, []);

  const getPassword = useCallback(async () => {
    const cred = await navigator.credentials.get({
      password: true,
    } as any);
    console.log(cred, "cred===getPassword");
  }, []);

  return (
    <div>
      <form onSubmit={onSubmit}>
        <label>
          id:
          <input type="text" name="id" />
        </label>
        <label>
          password:
          <input type="text" name="password" />
        </label>
        <button type="submit">save password</button>
      </form>
      <button onClick={getPassword}>getPassword</button>
    </div>
  );
}
