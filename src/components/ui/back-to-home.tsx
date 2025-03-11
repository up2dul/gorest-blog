import { ArrowLeftOutlined } from "@ant-design/icons";
import Link from "next/link";

export const BackToHome = () => {
  return (
    <Link
      href="/"
      aria-label="Back to home page"
      className="mb-4 inline-block text-blue-5 transition-colors underline hover:text-blue-4 hover:no-underline"
    >
      <ArrowLeftOutlined /> Back to home
    </Link>
  );
};
