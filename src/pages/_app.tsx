import { MainLayout } from "@/components/layout/main-layout";
import { AntdConfigProvider } from "@/context/antd-config-context";
import { AuthProvider } from "@/context/auth-context";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { AppProps } from "next/app";
import Head from "next/head";
import { NuqsAdapter } from "nuqs/adapters/next/pages";
import "@/styles/globals.css";
import { PagesTopLoader } from "nextjs-toploader/pages";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Gorest Blog Posts</title>
        <meta name="description" content="Blog posts from Gorest API" />
      </Head>

      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <AntdConfigProvider>
            <NuqsAdapter>
              <MainLayout>
                <PagesTopLoader color="#1677ff" showSpinner />
                <Component {...pageProps} />
              </MainLayout>
            </NuqsAdapter>
          </AntdConfigProvider>
        </QueryClientProvider>
      </AuthProvider>
    </>
  );
}
