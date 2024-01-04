import { Helmet } from "react-helmet";
import WrapLayout from "~/components/WrapLayout";
import { useSelector } from "react-redux";
import userSelector from "~/redux/selectors/user.selector";
import logo from "~/images/ourform/ourform3.png";
import { Link } from "react-router-dom";
import "./PrimaryLayout.scss";

function PrimaryLayout({ children, title = "Our Form" }) {
  const user = useSelector(userSelector.get);
  return (
    <WrapLayout>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <div id="primary-layout">
        <header>
          <div className="left">
            <Link to="/">
              <img src={logo} alt="logo" className="logo" />
            </Link>
          </div>
          <div className="right">
            {user && (
              <>
                <span className="display-name">{user.name}</span>
                <img src={user.avatar} alt="avatar" className="avatar" />
              </>
            )}
          </div>
        </header>
        <main>{children}</main>
      </div>
    </WrapLayout>
  );
}
export default PrimaryLayout;
