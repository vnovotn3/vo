"use client";

import AccountPage from "@/app/AccountPage";
import UserLayout from "../UserLayout";

export default function UserAccountPage({ params }) {
	return (
		<UserLayout>
			<AccountPage />
		</UserLayout>
	);
}
