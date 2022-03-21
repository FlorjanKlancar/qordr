import "../styles/globals.css";
import "tailwindcss/tailwind.css";
import CartProvider from "../components/components/store/CartProvider";
import React, { useState, useEffect, Suspense } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { SessionProvider } from "next-auth/react";
import "react-toastify/dist/ReactToastify.css";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("/api/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: [{ id: "xl-tshirt" }] }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <Suspense fallback="">
      <SessionProvider session={session}>
        <CartProvider>
          {clientSecret && (
            <Elements options={options} stripe={stripePromise}>
              <div id="overlays"></div>
              <Component {...pageProps} />
            </Elements>
          )}
        </CartProvider>
      </SessionProvider>
    </Suspense>
  );
}

export default MyApp;
