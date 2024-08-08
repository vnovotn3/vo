"use client";

import { useMemo } from "react";
import NavBar from "@/modules/ui/NavBar";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();
  const rightLinks = useMemo(
    () => [
      {
        label: "Registrace",
        type: "border",
        onClick: () => router.push("/register"),
      },
      {
        label: "Log in",
        type: "primary",
        onClick: () => router.push("/login"),
      },
    ],
    [router]
  );

  return (
    <>
      <div className="flex flex-1 flex-col min-h-full">
        <NavBar rightLinks={rightLinks} />
        <div className="flex flex-1">
          <div className="flex flex-1 flex-col px-6 pt-28 pb-20 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                To be done...
              </h2>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
