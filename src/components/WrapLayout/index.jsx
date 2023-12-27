import useAuthentication from "../../hooks/useAuthentication";

function WrapLayout({ children }) {
  useAuthentication();
  return <>{children}</>;
}
export default WrapLayout;
