import { cn } from "@/lib/utils";
import { Inter } from "next/font/google";
import { Header } from "./header";

const inter = Inter({ subsets: ["latin"] });

export const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main
      className={cn(
        inter.className,
        // 80px is the height of the header
        "min-h-[100vh-80px] mt-20 p-6 sm:px-14 md:px-24 lg:px-56 xl:px-72",
      )}
    >
      <Header />
      {children}
    </main>
  );
};
