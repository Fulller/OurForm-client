import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import WrapLayout from "../../components/WrapLayout";
import { useSelector, useDispatch } from "react-redux";
import userSelector from "../../redux/selectors/user.selector";
import logo from "../../images/ourform/ourform3.png";
import { Link } from "react-router-dom";
import FormService from "../../services/form.service";
import "./EditLayout.scss";
import editFormSlide from "../../redux/slides/edit_form.slide";

function EditLayout({ children, title = "Our Form" }) {
  const id = useParams().id;
  const dispatch = useDispatch();
  const user = useSelector(userSelector.get);
  useEffect(() => {
    (async function (id) {
      const form = await FormService.get(id);
      form && dispatch(editFormSlide.actions.initForm({ form }));
    })(id);
  }, [id, dispatch]);
  return (
    <WrapLayout>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <div id="edit-layout">
        <header>
          <div className="top">
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
          </div>
          <div className="bottom"></div>
        </header>
        <main>{children}</main>
      </div>
    </WrapLayout>
  );
}
export default EditLayout;
