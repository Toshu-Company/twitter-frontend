import "@/public/styles/globals.css";
import type { Metadata } from "next";
import Header from "./components/Header";
import Container from "./components/Container";
import Recoil from "./components/Recoil";

export const metadata: Metadata = {
  icons: "/images/twitter.svg",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Recoil.Root>
          <Header />
          <Container>{children}</Container>
        </Recoil.Root>
      </body>
    </html>
  );
}
