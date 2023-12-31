import "./globals.css";
import { Inter } from "next/font/google";
import VC from "@/components/VC";
import LinkC from "@/components/LinkC";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/* <Button onClick={vc}>vConsole</Button> */}
      <body className={inter.className}>
        <LinkC />
        {children}
      </body>
      <VC />
    </html>
  );
}
