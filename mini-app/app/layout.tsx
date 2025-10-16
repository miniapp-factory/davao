import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { MiniAppProvider } from "@/components/context/miniapp-provider";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { description, title } from "@/lib/metadata";
import { WagmiConfig } from "wagmi";
import { wagmiConfig } from "@/lib/wagmi";

const inter = localFont({
  src: "./InterVariable.ttf",
});

export const metadata: Metadata = {
  title,
  description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <WagmiConfig config={wagmiConfig}>
          <MiniAppProvider>
            <div className="font-sans min-h-screen flex flex-col place-content-between">
              <Header />
              {children}
              <Footer />
            </div>
          </MiniAppProvider>
        </WagmiConfig>
      </body>
    </html>
  );
}
