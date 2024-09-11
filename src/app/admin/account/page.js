"use client";

import AccountPage from "@/app/AccountPage";
import AdminLayout from "../AdminLayout";

export default function AdminAccountPage({ params }) {
	return (
		<AdminLayout>
			<AccountPage />
		</AdminLayout>
	);
}
