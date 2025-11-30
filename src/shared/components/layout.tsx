import type { ReactNode } from "react";
import { Header } from "./header";
import { Footer } from "./footer";
import { Sidebar } from "./sidebar";

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 bg-gray-50">{children}</main>
      </div>
      <Footer />
    </div>
  );
};
