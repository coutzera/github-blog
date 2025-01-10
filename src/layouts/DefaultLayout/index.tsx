import { DefaultLayoutContainer } from "./styles";
import { Header } from "../../components/Header";
import { Outlet } from "react-router-dom";

export function DefaultLayout() {
  return (
    <DefaultLayoutContainer>
      <Header />
      <main>
        <Outlet />
      </main>
    </DefaultLayoutContainer>
  );
}
