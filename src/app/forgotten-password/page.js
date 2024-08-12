"use client";

import { useCallback, useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import Input from "@/modules/ui/Input";
import NavBar from "@/modules/ui//NavBar";
import Modal from "@/modules/ui/Modal";
import Button from "@/modules/ui/Button";
import Loading from "@/modules/ui/Loading";

export default function ForgottenPasswordPage() {
	const [email, setEmail] = useState("");
	const [emailValid, setEmailValid] = useState(true);
	const [loading, setLoading] = useState(false);
	const [modalOpen, setModalOpen] = useState(false);
	const [modalTitle, setModalTitle] = useState("");
	const [modalMessage, setModalMessage] = useState("");
	const [isSuccess, setIsSuccess] = useState(false);
	const router = useRouter();

	useEffect(() => {
		setEmailValid(true);
	}, [email]);

	const redirectToLogin = useCallback(() => router.push("/login"), [router]);

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

	const handleModalButtonPress = useCallback(() => {
		if (isSuccess) redirectToLogin();
	}, [isSuccess, redirectToLogin]);

	const submit = useCallback(() => {
		setIsSuccess(false);

		if (email === "") {
			setModalTitle("Vyplňte email");
			setModalMessage("Zadejte prosím vaši emailovou adresu");
			setModalOpen(true);
			setEmailValid(false);
		} else {
			setLoading(true);
			fetch("/api/auth/reset-password", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ email }),
			}).then(async (res) => {
				setLoading(false);
				if (res.ok) {
					setIsSuccess(true);
					setModalTitle("Odeslán e-mail s obnovou hesla");
					setModalMessage(
						`Na vaši e-mailovou adresu ${email} jsme vám zaslali odkaz na obnovení hesla.`
					);
					setModalOpen(true);
				} else {
					setModalTitle("Došlo k chybě");
					if ((await res.json()).error.includes("invalid-email"))
						setModalMessage("Učet se zadanou e-mailovou adresou neexistuje");
					else setModalMessage("Zkuste znovu obnovit své heslo");
					setModalOpen(true);
				}
				setEmail("");
			});
		}
	}, [email]);

	return (
		<>
			<Loading loading={loading} />
			<Modal
				title={modalTitle}
				message={modalMessage}
				open={modalOpen}
				setOpen={setModalOpen}
				onButtonPress={handleModalButtonPress}
			/>
			<div className="flex flex-1 flex-col min-h-full">
				<NavBar rightLinks={rightLinks} />
				<div className="flex flex-1">
					<div className="flex flex-1 flex-col px-6 pt-28 pb-20 lg:px-8">
						<div className="sm:mx-auto sm:w-full sm:max-w-sm">
							<h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
								Zapomenuté heslo
							</h2>
						</div>

						<div className="mt-8 sm:mx-auto sm:w-full sm:max-w-sm">
							<div className="space-y-4">
								<div>
									<label
										htmlFor="email"
										className="block text-sm font-medium leading-6 text-gray-900"
									>
										E-mail
									</label>
									<div className="mt-2">
										<Input
											type="email"
											value={email}
											isValid={emailValid}
											onChange={(e) => setEmail(e.target.value)}
										/>
									</div>
								</div>

								<div className="pt-3">
									<Button
										onClick={submit}
										label="Obnovit heslo"
										type="primary"
										isFullWidth
									/>
								</div>
							</div>

							<p className="py-5 text-center text-sm text-gray-500">
								Chcete se přihlásit?
							</p>

							<div>
								<Button
									onClick={redirectToLogin}
									label="Přihlásit se"
									type="border"
									isFullWidth
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
