import "./globals.css";
import { Inter } from "next/font/google";
import { Header } from "@/components/header";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Davao Discovery Quiz",
  description: "Test your knowledge about Davao and the Philippines!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <Header />
        <main className="container mx-auto py-8">{children}</main>
      </body>
    </html>
  );
}
