import { MainLayout } from "@/components/layout/main-layout";
import { AntdConfigProvider } from "@/context/antd-config-context";
import { AuthProvider } from "@/context/auth-context";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { AppProps } from "next/app";

import "@/styles/globals.css";
import Head from "next/head";

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
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <AntdConfigProvider>
          <Head>
            <title>Gorest Blog Posts</title>
            <meta name="description" content="Blog posts from Gorest API" />
          </Head>
          <MainLayout>
            <Component {...pageProps} />
          </MainLayout>
        </AntdConfigProvider>
      </QueryClientProvider>
    </AuthProvider>
  );
}
