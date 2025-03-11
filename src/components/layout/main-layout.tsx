import { Header } from "@/components/layout/header";
import { BackToHome } from "@/components/ui/back-to-home";
import { cn } from "@/lib/utils";
import { Inter } from "next/font/google";
import { useRouter } from "next/router";

const inter = Inter({ subsets: ["latin"] });

export const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const isNotHomePage = router.asPath !== "/";

  return (
    <main
      className={cn(
        inter.className,
        // 80px is the height of the header
        "min-h-[100vh-80px] mt-20 p-6 pb-10 sm:px-14 md:px-24 lg:px-56 xl:px-72",
      )}
    >
      <Header />
      {isNotHomePage && <BackToHome />}
      {children}
    </main>
  );
};
