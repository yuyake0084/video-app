import "~/styles/reset.css";
import "~/styles/globals.css";
import "large-small-dynamic-viewport-units-polyfill";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
