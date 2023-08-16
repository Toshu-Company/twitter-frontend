import "@/public/styles/globals.css";
import type { Metadata } from "next";
import Header from "./components/Header";
import Container from "./components/Container";

export const metadata: Metadata = {
  title: "Twitter",
  description: "Twitter ^^",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Header />
        <Container>{children}</Container>
      </body>
    </html>
  );
}
