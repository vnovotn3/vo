"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Input from "@/components/input";
import NavBar from "@/components/navBar";
import Modal from "@/components/modal";
import Button from "@/components/button";

export default function ForgottenPasswordPage() {
  const [email, setEmail] = useState("");
  const [emailValid, setEmailValid] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalMessage, setModalMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setEmailValid(true);
  }, [email]);

  const redirectToLogin = useCallback(() => router.push("/login"), [router]);

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
      fetch("/api/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      }).then(async (res) => {
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
      <Modal
        title={modalTitle}
        message={modalMessage}
        open={modalOpen}
        setOpen={setModalOpen}
        onButtonPress={handleModalButtonPress}
      />
      <div className="flex flex-1 flex-col min-h-full">
        <NavBar />
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
