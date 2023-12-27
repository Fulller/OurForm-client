import { Helmet } from "react-helmet";
import WrapLayout from "../../components/WrapLayout";

function NoLayout({ children, title = "Ourform" }) {
  return (
    <WrapLayout>
      <div>
        <Helmet>
          <title>{title}</title>
        </Helmet>
        <main>{children}</main>
      </div>
    </WrapLayout>
  );
}
export default NoLayout;
