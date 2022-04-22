import "../styles/globals.css";
import "../styles/slick-styles.css";
import { RecoilRoot } from "recoil";
import { SnackbarProvider } from "notistack";

function MyApp({ Component, pageProps }) {
  return (
    <RecoilRoot>
      <SnackbarProvider
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        autoHideDuration={2500}
      >
        <Component {...pageProps} />
      </SnackbarProvider>
    </RecoilRoot>
  );
}

export default MyApp;
