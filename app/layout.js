import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SessionWrapper from "@/components/SessionWrapper";
import ContextProvider from "../store/store";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Chanda | Crowdfunding and Fundrasing Platform",
  description: "this website is a Crowdfunding and Fundrasing Platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionWrapper>
          <ContextProvider>
            <div className="text-white absolute top-0 z-[-2] min-h-screen w-full bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px]">
              <Navbar />
              <Toaster />
              <div className="min-h-[80.6vh]">{children}</div>
              <Footer />
            </div>
          </ContextProvider>
        </SessionWrapper>
      </body>
    </html>
  );
}
