import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "../chakra/theme";
import { RecoilRoot } from "recoil";
import Layout from "../components/Layout/Layout";
import NextNProgress from "nextjs-progressbar";

export default function App({ Component, pageProps }: AppProps) {
  return (
    // Gives us access to global state everywhere in our app
    <RecoilRoot>
      <ChakraProvider theme={theme}>
        <Layout>
          {/* <NextNProgress /> */}
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
    </RecoilRoot>
  );
}
