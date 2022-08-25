import type { AppProps } from "next/app";
import { useState, useEffect } from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import "../styles/globals.css";
import Head from "next/head";

const MyApp = ({ Component, pageProps }: AppProps) => {
  const [isSSR, setIsSSR] = useState(true);

  useEffect(() => {
    setIsSSR(false);
  }, []);

  if (isSSR) return "null";

  return (
    <>
      <Head>
        <title>TikTik World - Video Fun Website</title>
        <meta name="description" content="Creating dark theme mode in next"/>
      </Head>
      <GoogleOAuthProvider
        clientId={`${process.env.NEXT_PUBLIC_GOGGLE_API_TOKEN}`}
      >
        <div className="xl:w-[1200px] m-auto overflow-hidden h-[100vh]">
          <Navbar />
          <div className="flex g-6 md:gap-20">
            <div className="h-[92vh] overflow-hidden xl:overflow-auto">
              <Sidebar />
            </div>
            <div className="mt-4 flex flex-col gap-10 overflow-auto h-[88vh] videos flex-1">
              <Component {...pageProps} />
            </div>
          </div>
        </div>
      </GoogleOAuthProvider>
    </>
  );
};

export default MyApp;
