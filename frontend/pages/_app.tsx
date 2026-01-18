import type { AppProps } from "next/app";
import { UserProvider } from "../context/UserContext";
import { AuthProvider } from "../context/AuthContext";
import Navbar from "../components/Navbar";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <UserProvider>
        <Navbar />
        <Component {...pageProps} />
      </UserProvider>
    </AuthProvider>
  );
}

export default MyApp;
