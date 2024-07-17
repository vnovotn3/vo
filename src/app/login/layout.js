import "../globals.css";

export const metadata = {
  title: "Výzkum Odolnosti | Přihlášení",
  description: "Přihlášení",
};

export default function LoginLayout({ children }) {
  return (
    <html className="h-full bg-slate-50">
      <body className="h-full">{children}</body>
    </html>
  );
}
