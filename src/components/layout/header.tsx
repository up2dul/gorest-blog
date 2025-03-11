import { useAntdConfig } from "@/context/antd-config-context";
import { cn } from "@/lib/utils";
import { MoonFilled, SunFilled } from "@ant-design/icons";
import { Button } from "antd";
import Link from "next/link";

export const Header = () => {
  const { theme, toggleTheme } = useAntdConfig();

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-20 flex items-center justify-between border-b border-blue-5",
        "p-6 sm:px-14 md:px-24 lg:px-56 xl:px-72",
        "bg-white dark:bg-greyDark-1",
      )}
    >
      <Link href="/" aria-label="GoRest Blog Posts">
        <h1 className="text-2xl font-bold">
          GoRest Blog <span className="hidden sm:inline">Posts</span>
        </h1>
      </Link>

      <Button type="primary" onClick={toggleTheme}>
        {theme === "light" ? <MoonFilled /> : <SunFilled />}
      </Button>
    </header>
  );
};
