"use client";

import FitnessPage from "@/app/FitnessPage";
import UserLayout from "../UserLayout";

export default function UserAccountPage({ params }) {
	return (
		<UserLayout>
			<FitnessPage />
		</UserLayout>
	);
}
