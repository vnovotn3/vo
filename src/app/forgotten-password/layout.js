import "../globals.css";

export const metadata = {
  title: "Výzkum Odolnosti | Zapomenuté heslo",
  description: "Zapomenuté heslo",
};

export default function RegisterLayout({ children }) {
  return (
    <html className="h-full bg-slate-50">
      <body className="h-full">{children}</body>
    </html>
  );
}
