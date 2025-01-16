"use client";

import { useMemo } from "react";
import { useRouter, usePathname } from "next/navigation";

import NavBar from "@/modules/ui//NavBar";
import { useAuth, useLogOut } from "@/modules/auth/hooks";

export default function UserLayout({ children }) {
	const user = useAuth();
	const logOut = useLogOut();
	const router = useRouter();
	const pathname = usePathname();

	const centerLinks = useMemo(
		() => [
			{
				label: "Metody",
				type: "simple",
				onClick: () => router.push(`/user/blocks`),
				isActive: pathname === "/user/blocks",
			},
			{
				label: "Fitness metriky",
				type: "simple",
				onClick: () => router.push(`/user/fitness`),
				isActive: pathname === "/user/fitness",
			},
		],
		[router, pathname]
	);
	const rightLinks = useMemo(
		() => [
			{
				label: "Můj účet",
				type: "simple",
				onClick: () => router.push(`/user/account`),
				isActive: pathname === "/user/account",
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
					homePath="/user"
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
