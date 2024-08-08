"use client";

import { useCallback, useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import Input from "@/modules/ui/Input";
import NavBar from "@/modules/ui//NavBar";
import Modal from "@/modules/ui/Modal";
import Button from "@/modules/ui/Button";
import { validateEmail } from "@/modules/utils/validators";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [emailValid, setEmailValid] = useState(true);
  const [password, setPassword] = useState("");
  const [passwordValid, setPasswordValid] = useState(true);
  const [password2, setPassword2] = useState("");
  const [password2Valid, setPassword2Valid] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalMessage, setModalMessage] = useState("");
  const [modalButton, setModalButton] = useState("Zavřít");
  const [isSuccess, setIsSuccess] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setEmailValid(true);
    setPasswordValid(true);
    setPassword2Valid(true);
  }, [email, password, password2]);

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
    setModalButton("Zavřít");
    setIsSuccess(false);

    if (email === "") {
      setModalTitle("Vyplňte email");
      setModalMessage("Zadejte prosím vaši emailovou adresu");
      setModalOpen(true);
      setEmailValid(false);
    } else if (!validateEmail(email)) {
      setModalTitle("Nevalidní email");
      setModalMessage("Zadejte prosím validní emailovou adresu");
      setModalOpen(true);
      setEmailValid(false);
    } else if (password === "") {
      setModalTitle("Vyplňte heslo");
      setModalMessage("Zadejte prosím heslo");
      setModalOpen(true);
      setPasswordValid(false);
    } else if (password.length < 6) {
      setModalTitle("Slabé heslo");
      setModalMessage("Zadejte prosím heslo alespoň o 6ti znacích");
      setModalOpen(true);
      setPasswordValid(false);
    } else if (password !== password2) {
      setModalTitle("Hesla se neschodují");
      setModalMessage("Zkuste to prosím znovu");
      setModalOpen(true);
      setPasswordValid(false);
      setPassword2Valid(false);
    } else {
      fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      }).then(async (res) => {
        if (res.ok) {
          setIsSuccess(true);
          setModalTitle("Registrace dokončena");
          setModalMessage(
            "Na vaši e-mailovou adresu jsme vám zaslali odkaz pro ověření registrace"
          );
          setModalButton("Přihlásit se");
          setModalOpen(true);
        } else {
          setModalTitle("Došlo k chybě");
          if ((await res.json()).error.includes("email-already-in-use"))
            setModalMessage(
              "Učet se zadanou e-mailovou adresou již existuje. Zkuste se přihlásit"
            );
          else setModalMessage("Zkuste se zaregistrovat znovu");
          setModalOpen(true);
        }
        setEmail("");
        setPassword("");
        setPassword2("");
      });
    }
  }, [email, password, password2]);

  return (
    <>
      <Modal
        title={modalTitle}
        message={modalMessage}
        open={modalOpen}
        setOpen={setModalOpen}
        button={modalButton}
        onButtonPress={handleModalButtonPress}
      />
      <div className="flex flex-1 flex-col min-h-full">
        <NavBar rightLinks={rightLinks} />
        <div className="flex flex-1">
          <div className="flex flex-1 flex-col px-6 pt-28 pb-20 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Registrace
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

                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Heslo znovu
                    </label>
                  </div>
                  <div className="mt-2">
                    <Input
                      type="password"
                      value={password2}
                      isValid={password2Valid}
                      onChange={(e) => setPassword2(e.target.value)}
                    />
                  </div>
                </div>

                <div className="pt-3">
                  <Button
                    onClick={submit}
                    label="Zaregistrovat se"
                    type="primary"
                    isFullWidth
                  />
                </div>
              </div>

              <p className="py-5 text-center text-sm text-gray-500">
                Máte již účet?
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
