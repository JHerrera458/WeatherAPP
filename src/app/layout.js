import "./globals.css";

export const metadata = {
  title: "Ejercicio 4: Weather API",
  description: "Ejercicio 4, prueba técnica para Russel Bedford.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body
      >
        {children}
      </body>
    </html>
  );
}
