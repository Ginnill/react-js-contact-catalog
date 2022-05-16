import { DashboardHeader, LinkLogout, Title } from "../../styles";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const D_Header = () => {
  const navigate = useNavigate();

  // verify login
  const loginVerify = () => {
    if (!localStorage.getItem("login")) navigate("/");
  };

  useEffect(() => {
    loginVerify();
  }, []);

  // logout
  const logout = () => {
    if (confirm("Você deseja sair da sua conta?") == true) {
      localStorage.setItem("login", "");
      navigate("/");
    }
  };
  return (
    <DashboardHeader>
      <Title>Dashboard</Title>
      <LinkLogout>
        <a style={{ cursor: "pointer" }} onClick={logout}>
          Sair
        </a>
      </LinkLogout>
    </DashboardHeader>
  );
};

export default D_Header;
