"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import Loading from "@/modules/ui/Loading";

import AdminLayout from "./AdminLayout";

export default function AdminPage() {
	const router = useRouter();

	useEffect(() => router.push(`/admin/blocks`), [router]);

	return (
		<AdminLayout>
			<Loading loading={true} />
		</AdminLayout>
	);
}
