import logo from "~/images/ourform/ourform3.png";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import userSelector from "~/redux/selectors/user.selector";
import behaviorSelector from "~/redux/selectors/behavior.selector";
import behaviorSlide from "~/redux/slides/behavior.slide";

import { feature } from "~/constans/edit.const";

function Header() {
  const user = useSelector(userSelector.get);
  const dispatch = useDispatch();
  const currentFeature = useSelector(behaviorSelector.edit("feature"));
  function handleFeatureClick(name) {
    dispatch(behaviorSlide.actions.set_edit({ key: "feature", value: name }));
  }
  return (
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
      <div className="features">
        {feature.map(({ name, title, icon }) => {
          const active = currentFeature == name ? "active" : "";
          return (
            <button
              className={`feature ${active}`}
              key={name}
              onClick={() => handleFeatureClick(name)}
            >
              {icon}
              <span className="lable">{title}</span>
            </button>
          );
        })}
      </div>
    </header>
  );
}

export default Header;
