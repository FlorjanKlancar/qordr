import "../styles/globals.css";
import "tailwindcss/tailwind.css";
import CartProvider from "../components/components/store/CartProvider";
import { Suspense } from "react";

import { SessionProvider } from "next-auth/react";
import "react-toastify/dist/ReactToastify.css";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <Suspense fallback="">
      <SessionProvider session={session}>
        <CartProvider>
          <div id="overlays"></div>
          <Component {...pageProps} />
        </CartProvider>
      </SessionProvider>
    </Suspense>
  );
}

export default MyApp;
