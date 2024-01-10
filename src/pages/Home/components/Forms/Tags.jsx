import _ from "lodash";
import moment from "moment";
import { Link } from "react-router-dom";
import Image from "~/pages/components/Image";
import tagbg from "~/images/backgrounds/tag.avif";
// import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";

function Tags({ forms, styleForm = "tags", key }) {
  forms = _.clone(forms).reverse();
  if (styleForm == "tags") {
    return (
      <div className="tags" key={key}>
        {forms.map((form) => {
          let { createdAt = _.now() } = form;
          let { title } = form.setting;
          const hasTitle = !!_.trim(_.replace(title, /(<([^>]+)>)/gi, ""));
          const path = `/edit/${form._id}`;
          createdAt = moment(createdAt).format("LL");
          return (
            <Link key={form._id} to={path} className="tag">
              <div className="wrap-thumbnail">
                <Image src={tagbg} className="thumbnail"></Image>
              </div>
              <div className="info">
                <div
                  className="title"
                  dangerouslySetInnerHTML={{
                    __html: hasTitle
                      ? title
                      : "Question title has not content yet",
                  }}
                ></div>
                <span className="created-at">{createdAt}</span>
              </div>
              {/* <Tippy content="Nội dung của tooltip">
                <span className="material-symbols-outlined ">more_horiz</span>
              </Tippy> */}
            </Link>
          );
        })}
      </div>
    );
  }
  return (
    <div className="rows">
      {forms.map((form) => {
        const { title } = form.setting;
        const hasTitle = !!_.trim(_.replace(title, /(<([^>]+)>)/gi, ""));
        const patch = `/edit/${form._id}`;
        return (
          <Link key={form._id} to={patch}>
            <div
              className="title"
              dangerouslySetInnerHTML={{
                __html: hasTitle ? title : "Question title has not content yet",
              }}
            ></div>
          </Link>
        );
      })}
    </div>
  );
}
export default Tags;
