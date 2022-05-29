import "../styles/globals.css";
import "../styles/slick-styles.css";
import { RecoilRoot } from "recoil";
import { SnackbarProvider } from "notistack";
import { useEffect, useState } from "react";
import Router from "next/router";
import Layout from "../components/Layout";
import Loading from "../components/Loading";

function MyApp({ Component, pageProps }) {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const start = () => {
      setIsLoading(true);
    };
    const end = () => {
      setIsLoading(false);
    };

    Router.events.on("routeChangeStart", start);
    Router.events.on("routeChangeComplete", end);
    Router.events.on("routeChangeError", end);

    return () => {
      Router.events.off("routeChangeStart", start);
      Router.events.off("routeChangeComplete", end);
      Router.events.off("routeChangeError", end);
    };
  }, []);


  return (
    <RecoilRoot>
      <SnackbarProvider
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        autoHideDuration={2500}
      >
        {isLoading ?
        <Layout>
          <Loading />
        </Layout>
        :
        <Component {...pageProps} />
        }
      </SnackbarProvider>
    </RecoilRoot>
  );
}

export default MyApp;
