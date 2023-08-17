import "@/public/styles/globals.css";
import type { Metadata } from "next";
import Header from "./components/Header";
import Container from "./components/Container";
import Recoil from "./components/Recoil";
import { QueryClient, QueryClientProvider } from "react-query";
import Query from "./components/Query";

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
          <Query.Root>
            <Header />
            <Container>{children}</Container>
          </Query.Root>
        </Recoil.Root>
      </body>
    </html>
  );
}
