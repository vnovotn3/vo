import "../../globals.css";

export const metadata = {
	title: "Výzkum Odolnosti | Můj účet",
	description: "Výzkum Odolnosti",
};

export default function RegisterLayout({ children }) {
	return (
		<html className="h-full bg-slate-50">
			<body className="h-full">{children}</body>
		</html>
	);
}
