import { HeaderContainer } from "./styles";
import logoImg from "../../assets/blog-logo.svg";
export function Header() {
  return (
    <HeaderContainer>
      <img src={logoImg} />
    </HeaderContainer>
  );
}
