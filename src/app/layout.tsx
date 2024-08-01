import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import StreamClientProvider from "@/app/providers/StreamClientProvider";
import '@stream-io/video-react-sdk/dist/css/styles.css';
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Call with us",
  description: "We will see together",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StreamClientProvider>
          {children}
        </StreamClientProvider>
      </body>
    </html>
  );
}
