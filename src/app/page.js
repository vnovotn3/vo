"use client";

import { useEffect, useMemo } from "react";
import NavBar from "@/modules/ui/NavBar";
import { useRouter } from "next/navigation";

import AOS from "aos";
import "aos/dist/aos.css";

export default function HomePage() {
	useEffect(() => {
		AOS.init({
			duration: 600,
		});
	}, []);

	const router = useRouter();
	const rightLinks = useMemo(
		() => [
			{
				label: "Registrace",
				type: "border-white",
				onClick: () => router.push("/register"),
			},
			{
				label: "Přihlášení",
				type: "white",
				onClick: () => router.push("/login"),
			},
		],
		[router]
	);

	return (
		<>
			<div className="hero flex flex-1 flex-col h-full">
				<NavBar rightLinks={rightLinks} isTransparent />
				<div className="text mx-auto max-w-7xl w-full flex flex-1 flex-col justify-center p-8">
					<div className="title" data-aos="fade-up"></div>
					<p data-aos="fade-up" data-aos-delay="200" className="mt-6">
						Objev svůj potenciál s osmitýdenním protokolem Indomitable Soldier –
						navrženým tak, aby ti pomohl sladit přirozené rytmy těla, zvýšit
						energii a zvládnout svůj denní režim. Přidej se a objev skrytou sílu
						v sobě!
					</p>
					<div
						data-aos="fade-up"
						data-aos-delay="400"
						className="buttons flex flex-row gap-5 mt-12"
					>
						<a className="btn yellow" href="/register">
							Registruj se
						</a>
						<a className="btn outlined" href="#about">
							Zjsti více
						</a>
					</div>
				</div>
			</div>

			<div className="section blue-section" id="about">
				<div className="mx-auto max-w-7xl w-full flex flex-1 flex-col justify-center px-8">
					<section data-aos="fade-up">
						<h2>O projektu</h2>
						<p>
							Ve svých rukou držíš klíč k neuvěřitelné transformaci – protokol
							projektu Indomitable Soldier. Tento osmi týdenní průvodce byl
							navržen tak, aby ti pomohl probudit nejlepší verzi sebe sama, ať
							už na fyzické nebo psychické úrovni.
						</p>
						<p>
							Cílem programu je harmonizovat tvé cirkadiánní rytmy, což
							ti umožní vstoupit do každého dne plný energie a s jasným
							směřováním.
						</p>
						<p>
							Věříme, že každý z nás má v sobě sílu nepřemožitelného vojáka,
							který čelí výzvám s odhodláním a odvahou. A právě my tě provedeme
							cestou, jak tuto sílu objevit a naplno využít.
						</p>
					</section>
					<section data-aos="fade-up">
						<h2>Proč je to důležité?</h2>
						<p>
							Tvoje tělo je dokonalý stroj. Jakmile začneš rozumět jeho rytmům a
							potřebám, můžeš dosáhnout vyšších výkonů, lepší koncentrace a
							celkové pohody. V ranních hodinách, kdy svět ještě spí, můžeš
							získat klidný čas pro sebe, svůj rozvoj a nastavení dne do
							správných kolejí.
						</p>
					</section>
				</div>
			</div>

			<div className="section yellow-section">
				<div className="mx-auto max-w-7xl w-full flex flex-1 flex-col justify-center px-8">
					<section data-aos="fade-up">
						<h2>Co můžeš očekávat?</h2>
						<p>
							Během těchto osmi týdnů tě provedeme postupem, který tě naučí, jak
							krok za krokem měnit svůj denní režim. Nečekej žádné drastické
							změny přes noc, ale dokonalou změnu v průběhu 8 týdnů.
						</p>
						<p>
							Jde o malé, ale zásadní kroky, které tě postupně dovedou k cíli.
						</p>
					</section>
					<section data-aos="fade-up">
						<h2>Pro koho je tento program?</h2>
						<p>
							Program Indomitable Soldier je určen pro každého, kdo chce
							vstoupit do dne s jasnou myslí, svěžím tělem a odhodláním tvořit
							pozitivní změny ve svém životě. Ať už jsi student, pracující
							profesionál nebo sportovec, tento protokol ti nabídne nástroje a
							strategie k dosažení lepšího a produktivnějšího dne.
						</p>
					</section>
				</div>
			</div>

			<div className="section footer-section">
				<div className="mx-auto max-w-7xl w-full flex flex-1 flex-col justify-center px-8">
					<section data-aos="fade-up">
						<h2>Doporučení</h2>
						<p>
							Tento program vyžaduje odhodlání a disciplínu. Doporučujeme ti
							připravit se na tuto výzvu tím, že se seznámíš s celým protokolem
							a vytvoříš si prostředí podporující tvůj úspěch. Ať už je to
							připravený budík, stanovený plán rána, nebo přítel, který se k
							tobě připojí na této cestě, měj vše připraveno.
						</p>
						<p>
							Začněme tedy tuto dobrodružnou cestu společně a objevme skrytou
							sílu, kterou v sobě každý z nás má. Vítej v programu Indomitable
							Soldier. Tvá cesta začíná právě teď. Registruj se! 
						</p>
						<a href="/register" className="btn yellow mt-6">
							Registruj se
						</a>
					</section>
				</div>
			</div>
		</>
	);
}
