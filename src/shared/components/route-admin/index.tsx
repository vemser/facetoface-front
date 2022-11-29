import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../../contexts";

export const RouteAdmin = () => {
  const { token, user } = useAuth();
  let admin = user.perfis.find((item: any) => item.nome === "ROLE_ADMIN");
  let gestao = user.perfis.find((item: any) => item.nome === "ROLE_GESTAO");
  let instrutor = user.perfis.find(
    (item: any) => item.nome === "ROLE_INSTRUTOR"
  );
  if (token && admin) return <Outlet />;
  else return <Navigate to="/" />;
};
