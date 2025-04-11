import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/globals.css";
import Navigation from "../components/common/Navigation";
import './globals.css'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Docker Learning Simulator",
  description: "도커 학습을 위한 인터랙티브 시뮬레이터",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body className={inter.className}>
        <Navigation />
        <main className="container">
          <div className="app-container">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
