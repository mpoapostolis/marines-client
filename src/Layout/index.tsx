import React, { useEffect } from "react";
import Header from "../components/Header";
import { container, footer, main } from "./css";
import Routes from "../routes";
import { LOGOUT } from "../provider/names";
import { useAccount } from "../provider";
import { QueryClient, QueryClientProvider } from "react-query";
import LabelBottomNavigation from "../components/BottomNavigation";
import { cx } from "emotion";

const queryClient = new QueryClient();

function Layout() {
  const account = useAccount();

  useEffect(() => {
    window.addEventListener("__logout", () => {
      account.dispatch({ type: LOGOUT });
    });
    return () => {
      window.removeEventListener("__logout", () => void 0);
    };
  }, [account]);

  // const login = async () => {
  //   const payload = await getUserInfo();
  //   account.dispatch({ type: LOGIN, payload });
  // };

  useEffect(() => {
    // login();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <div className={container}>
        <Header />
        <main className={cx(main, "container")}>
          <Routes />
        </main>
        <footer className={footer}>
          <LabelBottomNavigation />
        </footer>
      </div>
    </QueryClientProvider>
  );
}
export default Layout;
