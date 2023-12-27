import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { setLS } from "../../tools/localStorage.tool";

const Auth = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const accessToken = searchParams.get("accesstoken");
  const refreshToken = searchParams.get("refreshtoken");

  accessToken && setLS("accesstoken", accessToken);
  refreshToken && setLS("refreshtoken", refreshToken);

  useEffect(() => {
    navigate("/");
  }, [navigate]);
  return <main id="auth-page"></main>;
};

export default Auth;
