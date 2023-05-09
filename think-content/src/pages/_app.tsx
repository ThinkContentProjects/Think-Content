import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "../chakra/theme";
import { RecoilRoot } from "recoil";
import Layout from "../components/Layout/Layout";
import NextNProgress from "nextjs-progressbar";
import React, { useEffect } from 'react';

declare global {
  interface Window {
    FB: any;
    fbAsyncInit: () => void;
  }
}

export {};

const loadFacebookSDK = () => {
  return new Promise<void>((resolve) => {
    window.fbAsyncInit = function() {
      window.FB.init({
        appId: '205411482261922',
        cookie: true,
        xfbml: true,
        version: 'v15.0'
      });

      // Additional initialization code or event handlers

      resolve();
    };

    (function(d, s, id) {
      let js: HTMLScriptElement,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement(s) as HTMLScriptElement; // Explicitly type as HTMLScriptElement
      js.id = id;
      (js as any).src = 'https://connect.facebook.net/en_US/sdk.js'; // Type assertion for 'src'
      fjs.parentNode?.insertBefore(js, fjs);
    })(document, 'script', 'facebook-jssdk');
  });
};



export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    loadFacebookSDK();
  }, []);

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

