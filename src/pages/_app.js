import "@/styles/globals.css";
import { NuqsAdapter } from "nuqs/adapters/next/app";

export default function App({ Component, pageProps }) {
  return (
    <NuqsAdapter>
      <Component {...pageProps} />
    </NuqsAdapter>
  );
}
