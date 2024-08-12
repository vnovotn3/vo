"use client";

import { useCallback, useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import Input from "@/modules/ui/Input";
import NavBar from "@/modules/ui//NavBar";
import Modal from "@/modules/ui/Modal";
import Button from "@/modules/ui/Button";
import Loading from "@/modules/ui/Loading";

export default function LoginPage() {
	const [email, setEmail] = useState("");
	const [emailValid, setEmailValid] = useState(true);
	const [loading, setLoading] = useState(false);
	const [password, setPassword] = useState("");
	const [passwordValid, setPasswordValid] = useState(true);
	const [modalOpen, setModalOpen] = useState(false);
	const [modalTitle, setModalTitle] = useState("");
	const [modalMessage, setModalMessage] = useState("");
	const router = useRouter();

	useEffect(() => {
		setEmailValid(true);
		setPasswordValid(true);
	}, [email, password]);

	const redirectToRegister = useCallback(
		() => router.push("/register"),
		[router]
	);

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

	const submit = useCallback(() => {
		if (email === "") {
			setModalTitle("Vyplňte email");
			setModalMessage("Zadejte prosím vaši emailovou adresu");
			setModalOpen(true);
			setEmailValid(false);
		} else if (password === "") {
			setModalTitle("Vyplňte heslo");
			setModalMessage("Zadejte prosím heslo");
			setModalOpen(true);
			setPasswordValid(false);
		} else {
			setLoading(true);
			fetch("/api/auth/login", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					email,
					password,
				}),
			}).then(async (res) => {
				setLoading(false);
				if (res.ok) {
					router.push("/admin");
				} else {
					const errorMessage = (await res.json()).error;
					setModalTitle("Došlo k chybě");
					if (errorMessage.includes("invalid-credential"))
						setModalMessage("Zadali jste špatnou e-mailovou adresu nebo heslo");
					else setModalMessage("Zkuste se přihlásit znovu");
					setModalOpen(true);
				}
				setEmail("");
				setPassword("");
			});
		}
	}, [email, password]);

	return (
		<>
			<Loading loading={loading} />
			<Modal
				title={modalTitle}
				message={modalMessage}
				open={modalOpen}
				setOpen={setModalOpen}
				button="Zkusit znovu"
			/>
			<div className="flex flex-1 flex-col min-h-full">
				<NavBar rightLinks={rightLinks} />
				<div className="flex flex-1">
					<div className="flex flex-1 flex-col px-6 pt-28 pb-20 lg:px-8">
						<div className="sm:mx-auto sm:w-full sm:max-w-sm">
							<h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
								Přihlášení
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

								<div>
									<div className="flex items-center justify-between">
										<label
											htmlFor="password"
											className="block text-sm font-medium leading-6 text-gray-900"
										>
											Heslo
										</label>
										<div className="text-sm">
											<a
												href="/forgotten-password"
												className="font-semibold text-indigo-600 hover:text-indigo-500"
											>
												Zapomněli jste heslo?
											</a>
										</div>
									</div>
									<div className="mt-2">
										<Input
											type="password"
											value={password}
											isValid={passwordValid}
											onChange={(e) => setPassword(e.target.value)}
										/>
									</div>
								</div>

								<div className="pt-3">
									<Button
										onClick={submit}
										label="Přihlásit se"
										type="primary"
										isFullWidth
									/>
								</div>
							</div>

							<p className="py-5 text-center text-sm text-gray-500">
								Ještě nemáte účet?
							</p>

							<div>
								<Button
									onClick={redirectToRegister}
									label="Zaregistrovat se"
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
