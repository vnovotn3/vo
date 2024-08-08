"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export const useAuth = () => {
  const [user, setUser] = useState();
  const router = useRouter();

  useEffect(() => {
    fetch("/api/auth/verify-token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }).then(async (res) => {
      if (res.ok) {
        const json = await res.json();
        setUser(json.user.email);
      } else router.push("/login");
    });
  }, []);

  return user;
};

export const useLogOut = () => {
  const router = useRouter();

  return useCallback(() => {
    fetch("/api/auth/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }).then(() => router.push("/login"));
  }, []);
};
