import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "../components/footer"
import Navbar from "../components/navbar";
import Providers from "../components/providers";
import { ProviderRpcError } from "viem";

const inter = Inter({ subsets:['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            {children}
            <div className="grow" />
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}