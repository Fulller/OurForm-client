import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import WrapLayout from "~/components/WrapLayout";
import FormService from "~/services/form.service";
import { useDispatch } from "react-redux";
import editFormSlide from "~/redux/slides/edit_form.slide";
import Header from "./Header";
import ".scss";

function EditLayout({ children, title = "Our Form" }) {
  const id = useParams().id;
  const dispatch = useDispatch();

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
      <div id="edit-layout" className="layout">
        <Header></Header>
        <main>{children}</main>
      </div>
    </WrapLayout>
  );
}
export default EditLayout;
