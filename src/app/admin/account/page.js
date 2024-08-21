"use client";

import { useCallback, useMemo, useState } from "react";

import { useUsers } from "@/modules/users/hooks";
import Button from "@/modules/ui/Button";
import Input from "@/modules/ui/Input";
import Loading from "@/modules/ui/Loading";
import Modal from "@/modules/ui/Modal";
import { useAuth, useLogOut } from "@/modules/auth/hooks";

import AdminLayout from "../AdminLayout";

export default function AccountPage({ params }) {
	const logOut = useLogOut();
	const [loading, setLoading] = useState(false);
	const [currPassword, setCurrPassword] = useState("");
	const [currPasswordValid, setCurrPasswordValid] = useState(true);
	const [newPassword, setNewPassword] = useState("");
	const [newPasswordValid, setNewPasswordValid] = useState(true);
	const [newPassword2, setNewPassword2] = useState("");
	const [newPassword2Valid, setNewPassword2Valid] = useState(true);
	const [modalOpen, setModalOpen] = useState(false);
	const [modalTitle, setModalTitle] = useState("");
	const [modalMessage, setModalMessage] = useState("");
	const email = useAuth();
	const { users } = useUsers();
	const user = useMemo(
		() => users.filter((u) => u.email === email)[0],
		[users, email]
	);

	const submit = useCallback(() => {
		if (currPassword === "") {
			setModalTitle("Vyplňte heslo");
			setModalMessage("Zadejte prosím heslo");
			setModalOpen(true);
			setCurrPasswordValid(false);
		} else if (newPassword === "") {
			setModalTitle("Vyplňte nové heslo");
			setModalMessage("Zadejte prosím nové heslo");
			setModalOpen(true);
			setNewPasswordValid(false);
		} else if (newPassword2 === "") {
			setModalTitle("Vyplňte nové heslo");
			setModalMessage("Zadejte prosím znovu nové heslo");
			setModalOpen(true);
			setNewPassword2Valid(false);
		} else if (newPassword.length < 6) {
			setModalTitle("Slabé nové heslo");
			setModalMessage("Zadejte prosím heslo alespoň o 6ti znacích");
			setModalOpen(true);
			setNewPasswordValid(false);
		} else if (newPassword !== newPassword2) {
			setModalTitle("Hesla se neschodují");
			setModalMessage("Zkuste to prosím znovu");
			setModalOpen(true);
			setNewPasswordValid(false);
			setNewPassword2Valid(false);
		} else {
			setLoading(true);
			fetch("/api/auth/change-password", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					email,
					currPassword,
					newPassword,
				}),
			}).then(async (res) => {
				setLoading(false);
				if (res.ok) {
					setModalTitle("Změna byla provedena");
					setModalMessage("Nastavili jsme vám úspěšně nové heslo");
					setModalOpen(true);
				} else {
					const errorMessage = (await res.json()).error;
					setModalTitle("Došlo k chybě");
					if (errorMessage.includes("invalid-credential"))
						setModalMessage("Zadali jste špatné současné heslo");
					else setModalMessage("Zkuste to znovu");
					setModalOpen(true);
				}
				setCurrPassword("");
				setNewPassword("");
				setNewPassword2("");
			});
		}
	}, [email, currPassword, newPassword, newPassword2]);

	if (!user) return null;
	return (
		<AdminLayout>
			<Loading loading={loading} />
			<Modal
				title={modalTitle}
				message={modalMessage}
				open={modalOpen}
				setOpen={setModalOpen}
			/>
			<div className="md:flex flex-col md:flex-row w-full space-y-6 md:space-y-0 space-x-0 md:space-x-6">
				<div className="flex flex-col w-full text-gray-700 bg-white flex-shrink-0 border rounded-md">
					<div className="relative shadow-md sm:rounded-lg p-8 pt-6">
						<div>
							<div className="px-4 sm:px-0">
								<h3 className="text-base font-semibold leading-7 text-gray-900">
									Můj účet
								</h3>
							</div>
							<div className="mt-4">
								<div className="divide-y divide-gray-100">
									<div className="px-4 py-4 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-0">
										<dt className="text-sm font-medium leading-6 text-gray-900">
											ID
										</dt>
										<dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-0">
											{user.code}
										</dd>
									</div>
									<div className="px-4 py-4 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-0">
										<dt className="text-sm font-medium leading-6 text-gray-900">
											Email
										</dt>
										<dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-0">
											{user.email}
										</dd>
									</div>
									<div className="px-4 py-4 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-0">
										<dt className="text-sm font-medium leading-6 text-gray-900">
											Datum registrace
										</dt>
										<dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-0">
											{user.registered_at}
										</dd>
									</div>
									<div className="px-4 py-4 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-0">
										<dt className="text-sm font-medium leading-6 text-gray-900">
											Změna hesla
										</dt>
										<dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-0">
											<label
												htmlFor="password"
												className="block text-sm font-medium leading-6 text-gray-900"
											>
												Stávající heslo
											</label>
											<div className="mt-2">
												<Input
													type="password"
													value={currPassword}
													isValid={currPasswordValid}
													onChange={(e) => setCurrPassword(e.target.value)}
												/>
											</div>
										</dd>
										<dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-0">
											<label
												htmlFor="password"
												className="block text-sm font-medium leading-6 text-gray-900"
											>
												Nové heslo
											</label>
											<div className="mt-2">
												<Input
													type="password"
													value={newPassword}
													isValid={newPasswordValid}
													onChange={(e) => setNewPassword(e.target.value)}
												/>
											</div>
										</dd>
										<dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-0">
											<label
												htmlFor="password"
												className="block text-sm font-medium leading-6 text-gray-900"
											>
												Nové heslo znovu
											</label>
											<div className="mt-2">
												<Input
													type="password"
													value={newPassword2}
													isValid={newPassword2Valid}
													onChange={(e) => setNewPassword2(e.target.value)}
												/>
											</div>
										</dd>
									</div>
								</div>
							</div>
							<div className="mt-4 pt-6 flex items-center justify-between border-t border-gray-900/10">
								<Button label="Odhlásit se" type="border" onClick={logOut} />
								<Button label="Uložit změny" type="primary" onClick={submit} />
							</div>
						</div>
					</div>
				</div>
			</div>
		</AdminLayout>
	);
}
