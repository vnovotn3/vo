"use client";

import { useMemo, useState } from "react";
import NavBar from "@/modules/ui//NavBar";
import { useRouter } from "next/navigation";
import { useAuth, useLogOut } from "@/modules/auth/hooks";

import Blocks from "./views/Blocks";

export default function AdminPage() {
  const user = useAuth();
  const logOut = useLogOut();
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState("blocks");
  const centerLinks = useMemo(
    () => [
      {
        label: "Bloky",
        type: "simple",
        onClick: () => setCurrentPage("blocks"),
        isActive: currentPage === "blocks",
      },
      {
        label: "Uživatelé",
        type: "simple",
        onClick: () => setCurrentPage("users"),
        isActive: currentPage === "users",
      },
      {
        label: "Emaily",
        type: "simple",
        onClick: () => setCurrentPage("emails"),
        isActive: currentPage === "emails",
      },
    ],
    [currentPage]
  );
  const rightLinks = useMemo(
    () => [
      {
        label: "Můj účet",
        type: "simple",
        onClick: () => setCurrentPage("account"),
      },
      {
        label: "Log out",
        type: "primary",
        onClick: () => logOut(),
      },
    ],
    [logOut]
  );

  if (!user) return null;

  return (
    <>
      <div className="flex flex-1 flex-col min-h-full">
        <NavBar
          title="Admin"
          rightLinks={rightLinks}
          centerLinks={centerLinks}
        />
        <div className="flex flex-1">
          <div className="flex flex-1 flex-col px-6 pt-6 pb-20 lg:px-8">
            <div className="mx-auto flex max-w-7xl p-4 lg:px-8 w-full">
              {currentPage === "blocks" && <Blocks />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
