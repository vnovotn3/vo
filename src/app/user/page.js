"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import Loading from "@/modules/ui/Loading";

import UserLayout from "./UserLayout";

export default function AdminPage() {
	const router = useRouter();

	useEffect(() => router.push(`/user/blocks`), [router]);

	return (
		<UserLayout>
			<Loading loading={true} />
		</UserLayout>
	);
}
