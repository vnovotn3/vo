"use client";

import { useMemo } from "react";
import { useRouter, usePathname } from "next/navigation";

import NavBar from "@/modules/ui//NavBar";
import { useAuth, useLogOut } from "@/modules/auth/hooks";

export default function AdminLayout({ children }) {
	const user = useAuth("admin");
	const logOut = useLogOut();
	const router = useRouter();
	const pathname = usePathname();

	const centerLinks = useMemo(
		() => [
			{
				label: "Bloky a emaily",
				type: "simple",
				onClick: () => router.push(`/admin/blocks`),
				isActive: pathname === "/admin/blocks",
			},
			{
				label: "Uživatelé",
				type: "simple",
				onClick: () => router.push(`/admin/users`),
				isActive: pathname === "/admin/users",
			},
		],
		[router, pathname]
	);
	const rightLinks = useMemo(
		() => [
			{
				label: "Můj účet",
				type: "simple",
				onClick: () => router.push(`/admin/account`),
				isActive: pathname === "/admin/account",
			},
			{
				label: "Odhlásit se",
				type: "primary",
				onClick: () => logOut(),
			},
		],
		[logOut, router, pathname]
	);

	if (!user) return null;

	return (
		<>
			<div className="flex flex-1 flex-col min-h-full">
				<NavBar
					homePath="/admin"
					title="Admin"
					rightLinks={rightLinks}
					centerLinks={centerLinks}
				/>
				<div className="flex flex-1">
					<div className="flex flex-1 flex-col px-0 pt-0 lg:pt-6 pb-20 lg:px-8">
						<div className="mx-auto flex max-w-7xl p-4 lg:px-8 w-full">
							{children}
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
