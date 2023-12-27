import { useNavigate } from "react-router-dom";

const PrivateRoute = () => {
  const navigate = useNavigate();
  navigate("http://localhost:3000/login");
  return <h1>Private</h1>;
};
export default PrivateRoute;
