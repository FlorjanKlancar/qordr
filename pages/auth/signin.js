import {getProviders, signIn} from "next-auth/react";
import {useState} from "react";
import {useEffect} from "react";

export default function SignIn() {
  const [providers, setProviders] = useState();
  async function fetchProviders() {
    setProviders(await getProviders());
  }
  useEffect(() => {
    fetchProviders();
  }, []);

  return (
    <div className="h-screen">
      <div className="pt-80">
        {providers &&
          Object.values(providers).map((provider) => (
            <div key={provider.name}>
              <button
                className="bg-blue-500 rounded-lg px-4 py-3 w-full text-white font-semibold"
                onClick={() =>
                  signIn(provider.id, {callbackUrl: "/pops/dashboard"})
                }
              >
                Sign in with {provider.name}
              </button>
            </div>
          ))}
      </div>
    </div>
  );
}
