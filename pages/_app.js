import "../styles/globals.css";
import "tailwindcss/tailwind.css";
import Layout from "../components/layout/Layout";
import CartProvider from "../components/components/store/CartProvider";
import { Suspense } from "react";
import { UserProvider } from "@auth0/nextjs-auth0";
import { Auth0Provider } from "@auth0/auth0-react";
import "react-toastify/dist/ReactToastify.css";

function MyApp({ Component, pageProps }) {
  return (
    <Suspense fallback="">
      <Auth0Provider
        domain="dev-xc46j-dt.us.auth0.com"
        clientId="dpuQMhLJyvMIZCUgbNFcE41sfw3faNqb"
        redirectUri="http://localhost:3000/api/auth/callback"
        audience="https://qorder.link/api"
      >
        <UserProvider>
          <CartProvider>
            <div id="overlays"></div>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </CartProvider>
        </UserProvider>
      </Auth0Provider>
    </Suspense>
  );
}

export default MyApp;
